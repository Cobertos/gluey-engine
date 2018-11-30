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
Flags different parts of this object dirty in the physics simulation

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

- [ ] Mass is currently uneditable, but it is calculated based on the shapes


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| force | <code>THREE.Vector3</code> |  | The force to apply, mass dependant |
| [pos] | <code>THREE.Vector3</code> | <code>this.getPhysicsParams().pos</code> | The position to apply it from in world coordinates. Will use the current position if undefined |

<a name="PhysicsPart+getPhysicsParams"></a>

### physicsPart.getPhysicsParams() ⇒ <code>object</code>
Returns the physics parameters for the `SimObject`. By default it

**Kind**: instance method of [<code>PhysicsPart</code>](#PhysicsPart)  
**Returns**: <code>object</code> - physic parameters object.  