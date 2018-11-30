import { _assert } from "./utils.js";

/**Stateful class that handles Inputs and bindings to keys*/
export class Input {
  /**@param {object} bindings An object of labels ("up", "down", "fire"), mapped to
   * keys ("a", "Z", "$")
   */
  constructor(bindings){
    _assert(typeof bindings === "object", "Bindings must be an object!");
    /**@prop {object} bindings An object of labels ("up", "down", "fire"), mapped to
     * keys ("a", "Z", "$")
     */
    this.bindings = bindings;
    this._reverseBindings = undefined;

    this.keyValues = {};
  }

  /**@prop {object} reverseBindings Keys mapped to labels (reverse of `.bindings`)
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

  /**Returns the current value for a binding name
   * @param {string} bind Name of the binding to get the value of
   * @returns {any} Value for that binding
   */
  getInput(bind){
    return this.keyValues[this.bindings[bind]];
  }

  /**Sets the current value for a key
   * @param {string} key Key to set the value for `keyCode.key`
   * @param {any} val Value to set
   */
  _setInput(key, val){
    this.keyValues[key] = val;
  }
}