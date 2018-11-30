<a name="SimObject..cls"></a>

## SimObject~cls ⇐ <code>THREE.Object3D</code>
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

### cls.scene
Gets the scene

**Kind**: instance property of [<code>cls</code>](#SimObject..cls)  
**Properties**

| Name |
| --- |
| scene | 

<a name="SimObject..cls+finishConstruction"></a>

### cls.finishConstruction()
You must call this after construction finishes to properly setupthings.

**Kind**: instance method of [<code>cls</code>](#SimObject..cls)  
**Todo**

- [ ] Add an assert if this isn't called
- [ ] Is the setTimeout above enough?
- [ ] Remove duplication of _partClss functionalityand call finishDefinition on event SimObject (refactor)

<a name="SimObject..cls+add"></a>

### cls.add() ⇒ <code>undefined</code>
Override for add.

**Kind**: instance method of [<code>cls</code>](#SimObject..cls)  
**Returns**: <code>undefined</code> - Nothing  

| Param | Type | Description |
| --- | --- | --- |
| ...objs | <code>THREE.Object3D</code> \| [<code>SimObject</code>](#SimObject) | Objects |

<a name="SimObject..cls+remove"></a>

### cls.remove() ⇒ <code>undefined</code>
Override for remove

**Kind**: instance method of [<code>cls</code>](#SimObject..cls)  
**Returns**: <code>undefined</code> - Nothing  
**Todo**

- [ ] You might have issues removing things added in add()if you are removing them in the same order (see comment in code)


| Param | Type | Description |
| --- | --- | --- |
| ...objs | <code>THREE.Object3D</code> \| [<code>SimObject</code>](#SimObject) | Objects |

<a name="SimObject..cls.finishDefinition"></a>

### cls.finishDefinition()
You must call this after the class is defined if one of yourmixed in parts has a onDefined callback (like the NetworkPart)

**Kind**: static method of [<code>cls</code>](#SimObject..cls)  
<a name="SimObject..cls._partApplyStatic"></a>

### cls.\_partApplyStatic(func, args)
Calls function.apply() for every part that has func.Only necessary when multiple parts define the samefunction where they would otherwise overwrite each otherin the aggregation() process

**Kind**: static method of [<code>cls</code>](#SimObject..cls)  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>string</code> | The function name to call |
| args | <code>Array.&lt;any&gt;</code> | The arguments to call with |

