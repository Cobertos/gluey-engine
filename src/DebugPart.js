import { BasePart } from "./BasePart";

const isDebugBuild = true;
/**Adds a `onDebug` hook for `SimObject`s to listen to to add
 * debugging objects to the build/game
 */
export class DebugPart extends BasePart {
  //initializer() {}
  onConstructed() {
    if(isDebugBuild && typeof this.onDebug === "function") {
      this.onDebug();
    }
  }
}