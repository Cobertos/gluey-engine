<a name="OIMOScenePart"></a>

## OIMOScenePart
Wrapper around `OIMOWorker` and all it's communication

**Kind**: global class  

* [OIMOScenePart](#OIMOScenePart)
    * [.phys_fps](#OIMOScenePart+phys_fps) ⇒ <code>number</code>
    * [.load()](#OIMOScenePart+load) ⇒ <code>Promise</code>
    * [.onMessage(msg)](#OIMOScenePart+onMessage)
    * [.phys_add(physObj, [threeObj])](#OIMOScenePart+phys_add)
    * [.phys_set(physObj, [setPos], [setRot], [setVel], [setAngVel])](#OIMOScenePart+phys_set)
    * [.phys_del(physObj)](#OIMOScenePart+phys_del)
    * [.phys_impulse(physObj, pos, force)](#OIMOScenePart+phys_impulse)
    * [.phys_play()](#OIMOScenePart+phys_play)
    * [.phys_pause()](#OIMOScenePart+phys_pause)

<a name="OIMOScenePart+phys_fps"></a>

### oimoScenePart.phys\_fps ⇒ <code>number</code>
Gets the currect fps

**Kind**: instance property of [<code>OIMOScenePart</code>](#OIMOScenePart)  
**Returns**: <code>number</code> - The last FPS received from the OIMOWorker  
<a name="OIMOScenePart+load"></a>

### oimoScenePart.load() ⇒ <code>Promise</code>
**Kind**: instance method of [<code>OIMOScenePart</code>](#OIMOScenePart)  
**Returns**: <code>Promise</code> - Promise when the Worker has finished loading  
<a name="OIMOScenePart+onMessage"></a>

### oimoScenePart.onMessage(msg)
Called after a physics simulation frame. Unserializes all the data from thebyte array in the same way it was packed

**Kind**: instance method of [<code>OIMOScenePart</code>](#OIMOScenePart)  

| Param | Description |
| --- | --- |
| msg | The message from the Worker |

<a name="OIMOScenePart+phys_add"></a>

### oimoScenePart.phys\_add(physObj, [threeObj])
Adds a physics object with the given params, optionally takinga THREE.js object to keep up to date with the physics object.

**Kind**: instance method of [<code>OIMOScenePart</code>](#OIMOScenePart)  

| Param | Type | Description |
| --- | --- | --- |
| physObj | <code>object</code> | Object with physics parameters |
| [threeObj] | <code>THREE.Object3D</code> | THREE.js object to update (normally the object that generated the physObj) |

<a name="OIMOScenePart+phys_set"></a>

### oimoScenePart.phys\_set(physObj, [setPos], [setRot], [setVel], [setAngVel])
Given a physics object will conditionally set pos, rot, velocity,and/or angular velocity

**Kind**: instance method of [<code>OIMOScenePart</code>](#OIMOScenePart)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| physObj | <code>object</code> |  | Physics parameters with the new data and .id |
| [setPos] | <code>boolean</code> | <code>true</code> | Conditionally set pos of data |
| [setRot] | <code>boolean</code> | <code>true</code> | Conditionally set rot of data |
| [setVel] | <code>boolean</code> | <code>false</code> | Conditionally set linear velocity |
| [setAngVel] | <code>boolean</code> | <code>false</code> | Conditionally set angular velocity |

<a name="OIMOScenePart+phys_del"></a>

### oimoScenePart.phys\_del(physObj)
Deletes the given physics object from the simulation

**Kind**: instance method of [<code>OIMOScenePart</code>](#OIMOScenePart)  

| Param | Type | Description |
| --- | --- | --- |
| physObj | <code>object</code> | The physics object to delete (.id) |

<a name="OIMOScenePart+phys_impulse"></a>

### oimoScenePart.phys\_impulse(physObj, pos, force)
Applies impulse

**Kind**: instance method of [<code>OIMOScenePart</code>](#OIMOScenePart)  

| Param | Type | Description |
| --- | --- | --- |
| physObj | <code>object</code> | The physics object to apply to (.id) |
| pos | <code>Array.&lt;Number&gt;</code> | Three component array, the position to apply to |
| force | <code>Array.&lt;Number&gt;</code> | Three component array, the force to apply, will be scaled by 1/m |

<a name="OIMOScenePart+phys_play"></a>

### oimoScenePart.phys\_play()
Starts the simulation

**Kind**: instance method of [<code>OIMOScenePart</code>](#OIMOScenePart)  
<a name="OIMOScenePart+phys_pause"></a>

### oimoScenePart.phys\_pause()
Pauses the simulation

**Kind**: instance method of [<code>OIMOScenePart</code>](#OIMOScenePart)  
