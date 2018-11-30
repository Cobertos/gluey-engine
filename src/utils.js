import * as THREE from "three";

export class PromiseProxy {
  constructor(initialPromise) {
    let externalResolve, externalReject;
    let p = new Promise((res, rej)=>{
      externalResolve = res;
      externalReject = rej;
    });
    p.externalResolve = externalResolve;
    p.externalReject = externalReject;

    p.proxy = function(externalPromise){
      externalPromise
        .then(externalResolve)
        .catch(externalReject);
    };

    if(initialPromise) {
      p.proxy(initialPromise);
    }

    return p;
  }
}

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

/**Correlary to JQuery's $.parseHTML for plain js
 * @param {string} The HTML to convert to elements
 * @returns {DocumentFragment} A document fragment that can be
 * added directly to DOM with appendChild
 */
export function parseHTML(str) {
  let parser = new DOMParser(),
  doc = parser.parseFromString(str, "text/html"),
  documentFragment = document.createDocumentFragment();
  Array.from(doc.body.children).forEach((el)=>{
    documentFragment.appendChild(el);
  });
  return documentFragment;
}