import * as THREE from "three";
import { BasePart } from "../BasePart";

/**Part that allows an object to participate in Oimo.js physics
 */
export class PhysicsPart extends BasePart {
  get supportsPhysics() { return true; }

  initializer() { //aggregation constructor
    //Extra parameters from physics simulation
    /**@prop {THREE.Vector3} linearVelocity Current linear velocity*/
    this.linearVelocity = new THREE.Vector3(0,0,0);
    /**@prop {THREE.Vector3} angularVelocity Current angular velocity*/
    this.angularVelocity = new THREE.Vector3(0,0,0);

    //object added to physics system by the physics scene part
    //when it is registed
  }

  /**Flags different parts of this object dirty in the physics simulation
   * and sends a message to the physics engine to update it
   * @param {boolean} [dirtyPos=true] Dirty the position
   * @param {boolean} [dirtyRot=true] Dirty the rotation
   * @param {boolean} [dirtyVel=true] Dirty the linear velocity
   * @param {boolean} [dirtyAngVel=true] Dirty the angular velocity
   */
  dirty(dirtyPos=true, dirtyRot=false, dirtyVel=false, dirtyAngVel=false) {
    if(!this.scene) {
      throw new Error("No physics scene");
    }
    let params = this.getPhysicsParams();
    this.scene.phys_set(params, dirtyPos, dirtyRot, dirtyVel, dirtyAngVel);
  }

  /**Adds a force/impulse to the object in the next physics frame
   * @param {THREE.Vector3} force The force to apply, mass dependant
   * @param {THREE.Vector3} [pos=this.getPhysicsParams().pos] The position to apply it from in
   * world coordinates. Will use the current position if undefined
   * @todo Mass is currently uneditable, but it is calculated based on the shapes
   * passed (their volume) and a .massInfo object (their density).
   */
  impulse(force, pos=undefined) {
    this.scene.phys_impulse(this.getPhysicsParams(), 
      pos ? pos.toArray() : this.getPhysicsParams().pos,
      force.toArray());
  }

  /**Returns the physics parameters for the `SimObject`. By default it
   * will return:
   * * `.id` - ID in the physics simulation, uses THREE.js `.uuid` by default
   * * `.pos` - Position in physics simulation, uses THREE.js `.position` by default
   * * `.size` - Size of the shape, uses THREE.js `.boundingBox.getSize()` by default
   * * `.rot` - Quat of the shape, uses THREE.js `.quaternion` by default
   * * `.vel` - Linear velocity, uses `.linearVelocity` by default
   * * `.angVel` - Angular velocity, uses `.angularVelocity` by default
   * 
   * There is no default for some properties and you need to add them yourself:
   * * `.type` - The shape type, see `OIMOjsInternals.md`
   * * `.kinematic` - Static unless moved by a script
   * * `.move` - Participates in freeform physics
   * * `.static` - ALWAYS STATIC. Moving it will result in an error
   * * `.neverSleep` - Always awake (currently required to make it always fire
   *     `onPhysicsTick()` every frame)
   *
   * It might be useful to inherit from this function and `super()` call it.
   *
   * These are all sent to the `Worker` so anything in `world.add()` in `Oimo.js`
   * can be used/returned. If you pass something that isn't a scalar (custom classes
   * or functions), it will most likely error (because it's going to another `Worker`).
   * Check `OIMOjsInternals.md` and the `Oimo.js` documentation for more information
   * on this stuff.
   * @returns {object} physic parameters object.
   */
  getPhysicsParams() {
    let geo = this.geometry;
    if(!geo.boundingBox) {
      geo.computeBoundingBox();
    }
    let size = new THREE.Vector3();
    let tmp = new THREE.Vector3();
    geo.boundingBox.getSize(size)
      .multiply(this.getWorldScale(tmp));

    return {
      id: this.uuid,
      pos: this.position.toArray(),
      size: size.toArray(),
      rot: this.quaternion.toArray(),
      vel: this.linearVelocity.toArray(),
      angVel: this.angularVelocity.toArray()
    };
  }
}