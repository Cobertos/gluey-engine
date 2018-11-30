import * as THREE from "three";
import aggregation from "aggregation";
import { BasePart } from "./BasePart";
import { _assert } from "./utils";

/**Function that returns `SimObjectInheritor`, the main class in JamminJS.
 * Inherits from a THREE.js class and then multiple `BasePart` inheriting
 * classes to add functionality like physics or networking.
 * @example
 * class MyObjectType extends SimObject(THREE.Mesh,PhysicsPart) {
 *    //This class would be a THREE.Mesh and would participate in
 *    //the physics system if your SimScene supports that
 * }
 * @param {function} threeCls a `THREE.Object3D` constructor (like `THREE.Mesh`)
 * @param {...function} partClss Vararg for all the other classes to mixin.
 * @returns {function} The new `SimObject` base class to inherit from.
 * @todo Some of the add() remove() functions won't work without overwriting the THREE.js prototype
 * for this stuff
 */
export function SimObject(threeCls, ...partClss) {
  _assert(threeCls.prototype instanceof THREE.Object3D ||
          threeCls.prototype === THREE.Object3D.prototype, "Must inherit from THREE.Object3D or descendant");
  partClss = [DefaultPart, ...partClss];

  /**The actual class created by `SimObject()`, inherits from
   * `aggregation(threeCls, ...partClss)` and the prototype chain
   * will include the `THREE.Object3D` (everything else is just mixed in)
   * @extends THREE.Object3D
   */
  class SimObjectInheritor extends aggregation(threeCls, ...partClss) {
    /**@param {...any} Vararg of args to pass to THREE.js constructor
     */
    constructor(...args){
      super(...args);
      this.partClss = partClss;
      setTimeout(this.finishConstruction.bind(this)); //The next javascript frame, call this
    }

    /**You **MUST** call this after the class is defined if one of your
     * mixed in parts has a `onDefined` callback (like the `NetworkPart`)
     * to post-process the functions in that class.
     * @todo Enforce this with an assert
     */
    static finishDefinition() {
      this._partApplyStatic("onDefined");
    }

    /**You **MUST** call this after construction finishes to properly setup
     * things.
     * @todo Add an assert if this isn't called
     * @todo Is the `setTimeout` above enough?
     * @todo Remove duplication of `_partClss` functionality
     * and call `finishDefinition` on event SimObject (refactor)
     */
    finishConstruction() {
      this._partApply("onConstructed");
    }

    /**For every mixed in part class, calls `partCls[func].apply(this, args)`
     * statically, allowing for all parts to get notified of a class event through
     * exposing hooks, like `onDefined`.
     * @param {string} func Function name to call
     * @param {any[]} args Arguments to call with
     */
    static _partApplyStatic(func, args) {
      partClss.forEach((partCls)=>{
        if(partCls[func]) {
          partCls[func].apply(this, args);
        }
      });
    }
    /**For every mixed in part, calls `part[func].apply(this, args)` allowing
     * all parts to get notified of an instance event through exposing hooks, like
     * `onConstructed`
     * @param {string} func Function name to call
     * @param {any[]} args Arguments to call with
     */
    _partApply(func, args) {
      //Fail fast if we don't have it mixed in b/c it should be in here from aggregation
      if(typeof this[func] !== "function") {
        return;
      }
      partClss.forEach((partCls)=>{
        if(func in partCls.prototype) {
          partCls.prototype[func].apply(this, args);
        }
      });
    }

    /**@override
     * @param {THREE.Object3D|SimObject} ...objs Objects to add
     * @returns {undefined} Nothing
     */
    add(...objs) {
      objs.forEach((obj)=>{
        //Don't call with ...objs as three.js will call .add()
        //for every object again
        super.add(obj);
        if(this.scene && typeof this.scene.register === "function") {
          obj.traverse((obj)=>{
            //Depth first by default, will
            //include self
            this.scene.register(obj);
          });
        }
      });
    }

    /**@override
     * @param {THREE.Object3D|SimObject} ...objs Objects
     * @returns {undefined} Nothing
     * @todo You might have issues removing things added in add()
     * if you are removing them in the same order (see comment in code)
     */
    remove(...objs) {
      objs.forEach((obj)=>{
        if(this.scene && typeof this.scene.unregister === "function") {
          obj.traverse((obj)=>{
            //Depth first by default, will
            //include self
            //TODO: This is a ticking time bomb, unregistration
            //happens in the same order as registration where we
            //will unregister the root removed object first. This
            //might cause some issue, it needs to unregister from
            //the deepest child to the shallowest (breadth-first?))
            this.scene.unregister(obj);
          });
        }
        //Don't call with ...objs as three.js will call .remove()
        //for every object again
        super.remove(obj);
      });
    }

    /**@prop {SimScene} Root scene this object is attached to, if any
     */
    get scene() {
      return this.parent && this.parent.scene;
    }
  }

  return SimObjectInheritor;
}

/**By default mixed into every `SimObjectInheritor`. Do NOT inherit from this,
 * inherit from `BasePart` instead.
 */
export class DefaultPart extends BasePart {
  onConstructed(){
    //Setup onTick callback
    if(typeof this.onTick === "function") {
      this.onBeforeRender = this.onTick.bind(this);
    }
  }
}