import * as THREE from "three";

/**Wraps a `Promise` to externalize `resolve` and `reject`.
 */
export class PromiseProxy {
  /**@param {Promise} initialPromise Promise to proxy
   * right at the start
   */
  constructor(initialPromise) {
    let externalResolve, externalReject;
    let p = new Promise((res, rej)=>{
      externalResolve = res;
      externalReject = rej;
    });
    p.externalResolve = externalResolve;
    p.externalReject = externalReject;
    p._resolved = false;
    p._rejected = false;

    p.proxy = function(externalPromise){
      externalPromise
        .then(externalResolve)
        .catch(externalReject);
    };

    Object.defineProperty(p, "isResolved", {
      get(){ return this._resolved; }
    });
    Object.defineProperty(p, "isRejected", {
      get(){ return this._rejected; }
    });
    Object.defineProperty(p, "isPending", {
      get(){ return !(this._resolved && this._rejected); }
    });

    if(initialPromise) {
      p.proxy(initialPromise);
    }

    return p;
  }

  /**Resolves the `Promise`
   * @method externalResolve
   */
  /**Rejects the `Promise`
   * @method externalReject
   */
  /**Makes this `PromiseProxy` take the state of the passed `Promise`
   * @method proxy
   * @param {Promise} externalPromise `Promise` to proxy
   */
  /**@prop isResolved {boolean}*/
  /**@prop isRejected {boolean}*/
  /**@prop isPending {boolean}*/
}

/**Assertion helper, custom message and error type
 */
export function _assert(condition, message="Assertion Error", error=Error) {
  if(!condition) {
    throw new error(message);
  }
}

export const conversions = {
  eventToWindowPX : (ev)=>{
    return new THREE.Vector2(ev.clientX, ev.clientY);
  },
  windowPXToViewportPX : ($el, v2)=>{
    return v2.sub(new THREE.Vector2($el.offset().left, $el.offset().top));
  },
  viewportPXToviewportNDC : ($el, v2)=>{
    v2.multiply(new THREE.Vector2(1/$el.innerWidth(), 1/$el.innerHeight()));
    v2.multiplyScalar(2);
    v2.sub(new THREE.Vector2(1,1));
    v2.multiply(new THREE.Vector2(1,-1));
    return v2;
  }
};