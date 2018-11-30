<a name="SimObject"></a>

## SimObject(threeCls, ...partClss) ⇒ <code>function</code>
Function that returns `SimObjectInheritor`, the main class in JamminJS.Inherits from a THREE.js class and then multiple `BasePart` inheritingclasses to add functionality like physics or networking.

**Kind**: global function  
**Returns**: <code>function</code> - The new `SimObject` base class to inherit from.  
**Todo**

- [ ] Some of the add() remove() functions won't work without overwriting the THREE.js prototypefor this stuff


| Param | Type | Description |
| --- | --- | --- |
| threeCls | <code>function</code> | a `THREE.Object3D` constructor (like `THREE.Mesh`) |
| ...partClss | <code>function</code> | Vararg for all the other classes to mixin. |

**Example**  
```js
class MyObjectType extends SimObject(THREE.Mesh,PhysicsPart) {   //This class would be a THREE.Mesh and would participate in   //the physics system if your SimScene supports that}
```
