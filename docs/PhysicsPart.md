<a name="PhysicsPart"></a>

## PhysicsPart
Part that allows an object to participate in Oimo.js physics

**Kind**: global class  

* [PhysicsPart](#PhysicsPart)
    * [.linearVelocity](#PhysicsPart+linearVelocity)
    * [.angularVelocity](#PhysicsPart+angularVelocity)
    * [.dirty([dirtyPos], [dirtyRot], [dirtyVel], [dirtyAngVel])](#PhysicsPart+dirty)
    * [.impulse(force, [pos])](#PhysicsPart+impulse)
    * [.getPhysicsParams()](#PhysicsPart+getPhysicsParams) ⇒ <code>object</code>

<a name="PhysicsPart+linearVelocity"></a>

### physicsPart.linearVelocity
**Kind**: instance property of [<code>PhysicsPart</code>](#PhysicsPart)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| linearVelocity | <code>THREE.Vector3</code> | Current linear velocity |

<a name="PhysicsPart+angularVelocity"></a>

### physicsPart.angularVelocity
**Kind**: instance property of [<code>PhysicsPart</code>](#PhysicsPart)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| angularVelocity | <code>THREE.Vector3</code> | Current angular velocity |

<a name="PhysicsPart+dirty"></a>

### physicsPart.dirty([dirtyPos], [dirtyRot], [dirtyVel], [dirtyAngVel])
Flags different parts of this object dirty in the physics simulationand sends a message to the physics engine to update it

**Kind**: instance method of [<code>PhysicsPart</code>](#PhysicsPart)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [dirtyPos] | <code>boolean</code> | <code>true</code> | Dirty the position |
| [dirtyRot] | <code>boolean</code> | <code>true</code> | Dirty the rotation |
| [dirtyVel] | <code>boolean</code> | <code>true</code> | Dirty the linear velocity |
| [dirtyAngVel] | <code>boolean</code> | <code>true</code> | Dirty the angular velocity |

<a name="PhysicsPart+impulse"></a>

### physicsPart.impulse(force, [pos])
Adds a force/impulse to the object in the next physics frame

**Kind**: instance method of [<code>PhysicsPart</code>](#PhysicsPart)  
**Todo**

- [ ] Mass is currently uneditable, but it is calculated based on the shapespassed (their volume) and a .massInfo object (their density).


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| force | <code>THREE.Vector3</code> |  | The force to apply, mass dependant |
| [pos] | <code>THREE.Vector3</code> | <code>this.getPhysicsParams().pos</code> | The position to apply it from in world coordinates. Will use the current position if undefined |

<a name="PhysicsPart+getPhysicsParams"></a>

### physicsPart.getPhysicsParams() ⇒ <code>object</code>
Returns the physics parameters for the `SimObject`. By default itwill return:* `.id` - ID in the physics simulation, uses THREE.js `.uuid` by default* `.pos` - Position in physics simulation, uses THREE.js `.position` by default* `.size` - Size of the shape, uses THREE.js `.boundingBox.getSize()` by default* `.rot` - Quat of the shape, uses THREE.js `.quaternion` by default* `.vel` - Linear velocity, uses `.linearVelocity` by default* `.angVel` - Angular velocity, uses `.angularVelocity` by defaultThere is no default for some properties and you need to add them yourself:* `.type` - The shape type, see `OIMOjsInternals.md`* `.kinematic` - Static unless moved by a script* `.move` - Participates in freeform physics* `.static` - ALWAYS STATIC. Moving it will result in an error* `.neverSleep` - Always awake (currently required to make it always fire    `onPhysicsTick()` every frame)It might be useful to inherit from this function and `super()` call it.These are all sent to the `Worker` so anything in `world.add()` in `Oimo.js`can be used/returned. If you pass something that isn't a scalar (custom classesor functions), it will most likely error (because it's going to another `Worker`).Check `OIMOjsInternals.md` and the `Oimo.js` documentation for more informationon this stuff.

**Kind**: instance method of [<code>PhysicsPart</code>](#PhysicsPart)  
**Returns**: <code>object</code> - physic parameters object.  
