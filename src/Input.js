import { _assert } from "./utils.js";

/**Stateful input class handler
 * @prop {object} bindings Action labels to keys for those actions
 * @prop {object} reverseBindings Keys on the keyboard and what action they're mapped to
 */
export class Input {
  /**
   * @param {object} bindings An object of labels ("up", "down", "fire"), mapped to
   * keys ("a", "Z", "$")
   */
  constructor(bindings){
    _assert(typeof bindings === "object", "Bindings must be an object!");
    this.bindings = bindings;
    this._reverseBindings = undefined;

    this.keyValues = {};
  }

  /**
   * @returns {object} Returns an object that is keys mapped to labels (the reverse of
   * the bindings in the constructor
   */
  get reverseBindings() {
    if(!this._reverseBindings) {
      this._reverseBindings = {};
      Object.keys(this.bindings)
        .forEach((k)=>{
          let bind = k;
          let key = this.bindings[k];
          this._reverseBindings[key] = bind;
        });
    }
    return this._reverseBindings;
  }

  /**Given a binding name, returns the current value of that input
   * @param {string} bind The name of the binding to retrieve the value for
   * @returns {any} The value for that binding (key down or up for now)
   */
  getInput(bind){
    return this.keyValues[this.bindings[bind]];
  }

  /**Given a key id, sets the value to the given value
   * @param {string} key The key to set the value for keyCode.key
   * @param {any} val The value to set
   */
  _setInput(key, val){
    this.keyValues[key] = val;
  }
}