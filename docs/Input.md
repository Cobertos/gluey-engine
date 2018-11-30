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

