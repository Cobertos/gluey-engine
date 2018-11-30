## Classes

<dl>
<dt><a href="#BasePart">BasePart</a></dt>
<dd><p>Base class for all parts. NOTE: Currently parts will work even without this base class
and this is just for documentation purposes...</p>
</dd>
<dt><a href="#Input">Input</a></dt>
<dd><p>Stateful input class handler</p>
</dd>
<dt><a href="#DefaultPart">DefaultPart</a></dt>
<dd><p>Do not inherit from this. Use BasePart instead</p>
</dd>
<dt><a href="#SimObjectLoader">SimObjectLoader</a></dt>
<dd><p>Loads an obj/mtl object asynchronously along with it&#39;s partner
physics parts</p>
</dd>
<dt><a href="#SimScene">SimScene</a></dt>
<dd><p>Scene that encapsulates mutiple types of scenes</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#isDebugBuild">isDebugBuild</a></dt>
<dd><p>Collects together debug portions of an object</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#initializer">initializer()</a></dt>
<dd><p>aggregation() library constructor. Called after child that uses part constructor()
but called before the parent class constructor (THREE.js constructor).
NOTE: constructor() will never be called b/c of how aggregation() is implemented!</p>
</dd>
<dt><a href="#onConstructed">onConstructed()</a></dt>
<dd><p>Called the first frame after the object finishes construction and
the super() call chain in constructor() has finished.</p>
</dd>
<dt><a href="#onTick">onTick()</a></dt>
<dd><p>Called every frame</p>
</dd>
<dt><a href="#SimObject">SimObject(...partClss)</a> ⇒ <code>function</code></dt>
<dd><p>Factory function for creating the base class for SimObjects of different
THREE.js classes</p>
</dd>
<dt><a href="#parseHTML">parseHTML(The)</a> ⇒ <code>DocumentFragment</code></dt>
<dd><p>Correlary to JQuery&#39;s $.parseHTML for plain js</p>
</dd>
</dl>

<a name="BasePart"></a>

## BasePart
Base class for all parts. NOTE: Currently parts will work even without this base classand this is just for documentation purposes...

**Kind**: global class  
<a name="Input"></a>

## Input
Stateful input class handler

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| bindings | <code>object</code> | Action labels to keys for those actions |
| reverseBindings | <code>object</code> | Keys on the keyboard and what action they're mapped to |


* [Input](#Input)
    * [new exports.Input(bindings)](#new_Input_new)
    * [.reverseBindings](#Input+reverseBindings) ⇒ <code>object</code>
    * [.getInput(bind)](#Input+getInput) ⇒ <code>any</code>
    * [._setInput(key, val)](#Input+_setInput)

<a name="new_Input_new"></a>

### new exports.Input(bindings)

| Param | Type | Description |
| --- | --- | --- |
| bindings | <code>object</code> | An object of labels ("up", "down", "fire"), mapped to keys ("a", "Z", "$") |

<a name="Input+reverseBindings"></a>

### input.reverseBindings ⇒ <code>object</code>
**Kind**: instance property of [<code>Input</code>](#Input)  
**Returns**: <code>object</code> - Returns an object that is keys mapped to labels (the reverse ofthe bindings in the constructor  
<a name="Input+getInput"></a>

### input.getInput(bind) ⇒ <code>any</code>
Given a binding name, returns the current value of that input

**Kind**: instance method of [<code>Input</code>](#Input)  
**Returns**: <code>any</code> - The value for that binding (key down or up for now)  

| Param | Type | Description |
| --- | --- | --- |
| bind | <code>string</code> | The name of the binding to retrieve the value for |

<a name="Input+_setInput"></a>

### input.\_setInput(key, val)
Given a key id, sets the value to the given value

**Kind**: instance method of [<code>Input</code>](#Input)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key to set the value for keyCode.key |
| val | <code>any</code> | The value to set |

<a name="DefaultPart"></a>

## DefaultPart
Do not inherit from this. Use BasePart instead

**Kind**: global class  
<a name="SimObjectLoader"></a>

## SimObjectLoader
Loads an obj/mtl object asynchronously along with it's partnerphysics parts

**Kind**: global class  

* [SimObjectLoader](#SimObjectLoader)
    * [.load(uri)](#SimObjectLoader+load) ⇒ <code>THREE.Object3D</code>
    * [.process(rootObj)](#SimObjectLoader+process)

<a name="SimObjectLoader+load"></a>

### simObjectLoader.load(uri) ⇒ <code>THREE.Object3D</code>
Actually loads and parses the .mtl and .obj filesfrom the given URL

**Kind**: instance method of [<code>SimObjectLoader</code>](#SimObjectLoader)  
**Returns**: <code>THREE.Object3D</code> - A THREE.Object3D with SimObjectsdepending on the names  

| Param | Type | Description |
| --- | --- | --- |
| uri | <code>string</code> | The url or path to load from |

<a name="SimObjectLoader+process"></a>

### simObjectLoader.process(rootObj)
Takes a loaded THREE.js object with special names that determine extraloading operations that need to be done to them.SPECIAL NAMES:PHYSICS_XXX_YYY: PHYSICS_ is the prefix, XXX is BOX or SPHERE whichis the type of physics object, and _ONLY suffix determines if the graphicsshould be kept or only used as size information

**Kind**: instance method of [<code>SimObjectLoader</code>](#SimObjectLoader)  

| Param | Type | Description |
| --- | --- | --- |
| rootObj | <code>THREE.Object3D</code> | The root object to traverse and modify. |

<a name="SimScene"></a>

## SimScene
Scene that encapsulates mutiple types of scenes

**Kind**: global class  

* [SimScene](#SimScene)
    * [.register(obj)](#SimScene+register)
    * [.unregister(obj)](#SimScene+unregister)

<a name="SimScene+register"></a>

### simScene.register(obj)
SimObjects added to us will call the register function

**Kind**: instance method of [<code>SimScene</code>](#SimScene)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>THREE.Object3D</code> \| [<code>SimObject</code>](#SimObject) | The object to register with the subsystems. Should already be in the THREE scene |

<a name="SimScene+unregister"></a>

### simScene.unregister(obj)
SimObjects added to us will call the register function

**Kind**: instance method of [<code>SimScene</code>](#SimScene)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>THREE.Object3D</code> \| [<code>SimObject</code>](#SimObject) | The object to unregister with the subsystems. Should still be in the THREE scene |

<a name="isDebugBuild"></a>

## isDebugBuild
Collects together debug portions of an object

**Kind**: global constant  
<a name="initializer"></a>

## initializer()
aggregation() library constructor. Called after child that uses part constructor()but called before the parent class constructor (THREE.js constructor).NOTE: constructor() will never be called b/c of how aggregation() is implemented!

**Kind**: global function  
**Todo**

- [ ] Confirm the calling order between the different parts in a SimObject andupdate documentation as necessarty

<a name="onConstructed"></a>

## onConstructed()
Called the first frame after the object finishes construction andthe super() call chain in constructor() has finished.

**Kind**: global function  
<a name="onTick"></a>

## onTick()
Called every frame

**Kind**: global function  
**Todo**

- [ ] This is bound to onBeforeRender, but it should be called regardless of whetheror not this object will render

<a name="SimObject"></a>

## SimObject(...partClss) ⇒ <code>function</code>
Factory function for creating the base class for SimObjects of differentTHREE.js classes

**Kind**: global function  
**Returns**: <code>function</code> - The new SimObject base class to inherit from. Use like`class XXX extends SimObject(THREE.Mesh, PhysicsPart) {}`  
**Todo**

- [ ] Some of the add() remove() functions won't work without overwriting the THREE.js prototypefor this stuff


| Param | Type | Description |
| --- | --- | --- |
| THREE.Object3D | <code>function</code> | constructor (like THREE.Mesh) |
| ...partClss | <code>function</code> | Vararg for all the other classes to mixin into the new THREE.js class. |


* [SimObject(...partClss)](#SimObject) ⇒ <code>function</code>
    * [~cls](#SimObject..cls) ⇐ <code>THREE.Object3D</code>
        * _instance_
            * [.scene](#SimObject..cls+scene)
            * [.finishConstruction()](#SimObject..cls+finishConstruction)
            * [.add()](#SimObject..cls+add) ⇒ <code>undefined</code>
            * [.remove()](#SimObject..cls+remove) ⇒ <code>undefined</code>
        * _static_
            * [.finishDefinition()](#SimObject..cls.finishDefinition)
            * [._partApplyStatic(func, args)](#SimObject..cls._partApplyStatic)

<a name="SimObject..cls"></a>

### SimObject~cls ⇐ <code>THREE.Object3D</code>
THREE.Object3D inherittor + any additionally inheritted parts passed fromthe called

**Kind**: inner class of [<code>SimObject</code>](#SimObject)  
**Extends**: <code>THREE.Object3D</code>  

* [~cls](#SimObject..cls) ⇐ <code>THREE.Object3D</code>
    * _instance_
        * [.scene](#SimObject..cls+scene)
        * [.finishConstruction()](#SimObject..cls+finishConstruction)
        * [.add()](#SimObject..cls+add) ⇒ <code>undefined</code>
        * [.remove()](#SimObject..cls+remove) ⇒ <code>undefined</code>
    * _static_
        * [.finishDefinition()](#SimObject..cls.finishDefinition)
        * [._partApplyStatic(func, args)](#SimObject..cls._partApplyStatic)

<a name="SimObject..cls+scene"></a>

#### cls.scene
Gets the scene

**Kind**: instance property of [<code>cls</code>](#SimObject..cls)  
**Properties**

| Name |
| --- |
| scene | 

<a name="SimObject..cls+finishConstruction"></a>

#### cls.finishConstruction()
You must call this after construction finishes to properly setupthings.

**Kind**: instance method of [<code>cls</code>](#SimObject..cls)  
**Todo**

- [ ] Add an assert if this isn't called
- [ ] Is the setTimeout above enough?
- [ ] Remove duplication of _partClss functionalityand call finishDefinition on event SimObject (refactor)

<a name="SimObject..cls+add"></a>

#### cls.add() ⇒ <code>undefined</code>
Override for add.

**Kind**: instance method of [<code>cls</code>](#SimObject..cls)  
**Returns**: <code>undefined</code> - Nothing  

| Param | Type | Description |
| --- | --- | --- |
| ...objs | <code>THREE.Object3D</code> \| [<code>SimObject</code>](#SimObject) | Objects |

<a name="SimObject..cls+remove"></a>

#### cls.remove() ⇒ <code>undefined</code>
Override for remove

**Kind**: instance method of [<code>cls</code>](#SimObject..cls)  
**Returns**: <code>undefined</code> - Nothing  
**Todo**

- [ ] You might have issues removing things added in add()if you are removing them in the same order (see comment in code)


| Param | Type | Description |
| --- | --- | --- |
| ...objs | <code>THREE.Object3D</code> \| [<code>SimObject</code>](#SimObject) | Objects |

<a name="SimObject..cls.finishDefinition"></a>

#### cls.finishDefinition()
You must call this after the class is defined if one of yourmixed in parts has a onDefined callback (like the NetworkPart)

**Kind**: static method of [<code>cls</code>](#SimObject..cls)  
<a name="SimObject..cls._partApplyStatic"></a>

#### cls.\_partApplyStatic(func, args)
Calls function.apply() for every part that has func.Only necessary when multiple parts define the samefunction where they would otherwise overwrite each otherin the aggregation() process

**Kind**: static method of [<code>cls</code>](#SimObject..cls)  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>string</code> | The function name to call |
| args | <code>Array.&lt;any&gt;</code> | The arguments to call with |

<a name="parseHTML"></a>

## parseHTML(The) ⇒ <code>DocumentFragment</code>
Correlary to JQuery's $.parseHTML for plain js

**Kind**: global function  
**Returns**: <code>DocumentFragment</code> - A document fragment that can beadded directly to DOM with appendChild  

| Param | Type | Description |
| --- | --- | --- |
| The | <code>string</code> | HTML to convert to elements |

