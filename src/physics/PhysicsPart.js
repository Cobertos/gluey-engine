import * as THREE from "three";
import { BasePart } from "../BasePart";
import { _assert } from "./utils";

/**Part that allows an object to participate in Oimo.js physics
 * @todo Eventually we might want to add a .physics namespace for
 * the properties to avoid name collisions but for now... just
 * prefix with physics when needed. (see TODO in constructor)
 */
export class PhysicsPart extends BasePart {
  static mixin(){
    return class PhysicsPartMixin {
      /**@prop {boolean} supportsPhysics*/
      get supportsPhysics() { return true; }

      initializer() {
        this.physics = new PhysicsPart(this);
      }
    }
  }

  constructor(simObject) {
    super(simObject);
    /**@prop {THREE.Vector3} linearVelocity Current linear velocity*/
    this.linearVelocity = new THREE.Vector3(0,0,0);
    /**@prop {THREE.Vector3} angularVelocity Current angular velocity*/
    this.angularVelocity = new THREE.Vector3(0,0,0);

    /**@prop {THREE.Vector3} properties Object with getters that the
     * for each key the physics system expects from the SimObject
     * see PhysicsPart#physicsPropertiesTemplate*/
    this.properties = this.createPhysicsProperties();
  }

  /**Flags different parts of this object dirty in the physics simulation
   * and sends a message to the physics engine to update it
   * @param {boolean} [dirtyPos=true] Dirty the position
   * @param {boolean} [dirtyRot=true] Dirty the rotation
   * @param {boolean} [dirtyVel=true] Dirty the linear velocity
   * @param {boolean} [dirtyAngVel=true] Dirty the angular velocity
   */
  dirty(dirtyPos=true, dirtyRot=false, dirtyVel=false, dirtyAngVel=false) {
    _assert(this.simObject.scene, "Not attached to scene");
    _assert(this.simObject.scene.supportsPhysics, "Not attached to physics scene");

    this.simObject.scene.physics.set(this.properties, dirtyPos, dirtyRot, dirtyVel, dirtyAngVel);
  }

  /**Adds a force/impulse to the object in the next physics frame
   * @param {THREE.Vector3} force The force to apply, mass dependant
   * @param {THREE.Vector3} [pos=this.getPhysicsParams().pos] The position to apply it from in
   * world coordinates. Will use the current position if undefined
   * @todo Mass is currently uneditable, but it is calculated based on the shapes
   * passed (their volume) and a .massInfo object (their density).
   */
  impulse(force, pos=undefined) {
    this.simObject.scene.physics.impulse(this.properties, 
      pos ? pos.toArray() : this.properties.pos,
      force.toArray());
  }

  /**Returns an object that provides getters and possibly setters for the names
   * the physics engine needs. By default it will return:
   * * `.id` - ID in the physics simulation, uses THREE.js `.uuid` by default
   * * `.position` - Position in physics simulation, uses THREE.js `.position` by default, 3 component array
   * * `.size` - Size of the shape, uses THREE.js `.boundingBox.getSize()` by default, 3 component array
   * * `.quaternion` - Quat of the shape, uses THREE.js `.quaternion` by default, 3 component array
   * * `.linearVelocity` - Linear velocity, uses `.linearVelocity` by default, 3 component array
   * * `.angularVelocity` - Angular velocity, uses `.angularVelocity` by default, 3 component array
   * 
   * There is no default for some properties and you need to add them yourself:
   * * `.type` - The shape type, see `OIMOjsInternals.md`
   * * `.kinematic` - Static unless moved by a script
   * * `.move` - Participates in freeform physics
   * * `.static` - ALWAYS STATIC. Moving it will result in an error
   * * `.neverSleep` - Always awake (currently required to make it always fire
   *     `onPhysicsTick()` every frame)
   *
   * It is recommended to override this function and `super()` call it.
   *
   * These are all sent to the `Worker` so anything in `world.add()` in `Oimo.js`
   * can be used/returned. If you pass something that isn't a scalar (custom classes
   * or functions), it will most likely error.
   * 
   * Check `OIMOjsInternals.md` and the `Oimo.js` documentation for more information
   * on this stuff.
   * @returns {object} physic parameters template, passed to utils#createTranslator().
   * @todo At some point, this shouldn't be doing the .toArray(), it should be
   * in the scene physics part because it's engine specific... (or maybe
   * rename this to OIMOPhysicsPart?
   */
  createOIMOPhysicsProperties() {
    const self = this;
    return {
      get id(){ self.simObject.uuid },

      get position(){ self.simObject.position.toArray() },
      set position(v){ self.simObject.position.fromArray(v) },

      get size(){
        let geo = self.simObject.geometry;
        if(!geo.boundingBox) {
          geo.computeBoundingBox();
        }
        return geo.boundingBox.getSize(new THREE.Vector3())
          .multiply(self.simObject.getWorldScale(new THREE.Vector3()))
          .toArray();
      },

      get quaternion(){ self.simObject.quaternion.toArray() },
      set quaternion(v){ self.simObject.quaternion.fromArray(v) },

      get linearVelocity(){ self.linearVelocity.toArray() },
      set linearVelocity(v){ self.linearVelocity.fromArray(v), },

      get angularVelocity(){ self.angularVelocity.toArray() },
      set angularVelocity(v){ self.angularVelocity.fromArray(v), },
    };
  }
}