/**Base class for all parts. A part is instantiated when an object is created.
 * It can also mixin functions into the original object too with mixin()
 */
export class BasePart {
  /**Class that will be a mixin for the object that is using this part. Allows
   * for the part to add things directly to the SimObject and participate in
   * any other system other Parts define on the SimObject itself
   * @returns {class} Mixin class. The constructor will never be called, use `initializer`
   * instead, as this is the constructor for `aggregation`
   * @todo Confirm the calling order between the different parts in a SimObject and
   * update documentation as necessarty
   */
  static mixin(){
    return undefined;
  }

  /**Return a part arguments object containing the passed
   * arguments
   */
  static arguments(...args){
    const thisCls = this;
    return class PartArguments {
      get isPartArguments() { return true; }
      get cls(){ return thisCls; }
      get args(){ return args; }
    };
  }

  /**Returns the arguments for this part for `mixin`. The part arguments
   * can exist anywhere in the arguments array (but should really be at the
   * end in the order presented to the SimObject extends clause) and
   * are of type PartArguments
   * @param {any[]} args An array of the arguments to find the part arguments
   * @returns {any[]} The part arguments if found, or an empty array if not (useful
   * for not needing an if in the spread operation)
   */
  static getPartArguments(args){
    if(typeof args[0] === "object" &&
      args[0][this.name] &&
      args[0][this.name].isPartArguments) {
      return args[0][this.name];
    }
    else {
      return [];
    }
  }

  constructor(simObject){
    this.simObject = simObject;
  }

  /**Called the first frame after the object finishes construction and
   * the super() call chain in constructor() has finished.
   * @method onConstructed
   */

  /**Called every frame
   * @method onTick
   * @todo This is bound to onBeforeRender, but it should be called regardless of whether
   * or not this object will render
   */
}