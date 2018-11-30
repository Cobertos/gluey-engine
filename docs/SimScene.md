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

