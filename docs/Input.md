<a name="Input"></a>

## Input
Stateful class that handles Inputs and bindings to keys

**Kind**: global class  

* [Input](#Input)
    * [new exports.Input(bindings)](#new_Input_new)
    * [.bindings](#Input+bindings)
    * [.reverseBindings](#Input+reverseBindings)
    * [.getInput(bind)](#Input+getInput) ⇒ <code>any</code>
    * [._setInput(key, val)](#Input+_setInput)

<a name="new_Input_new"></a>

### new exports.Input(bindings)

| Param | Type | Description |
| --- | --- | --- |
| bindings | <code>object</code> | An object of labels ("up", "down", "fire"), mapped to keys ("a", "Z", "$") |

<a name="Input+bindings"></a>

### input.bindings
**Kind**: instance property of [<code>Input</code>](#Input)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| bindings | <code>object</code> | An object of labels ("up", "down", "fire"), mapped to keys ("a", "Z", "$") |

<a name="Input+reverseBindings"></a>

### input.reverseBindings
**Kind**: instance property of [<code>Input</code>](#Input)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| reverseBindings | <code>object</code> | Keys mapped to labels (reverse of `.bindings`) |

<a name="Input+getInput"></a>

### input.getInput(bind) ⇒ <code>any</code>
Returns the current value for a binding name

**Kind**: instance method of [<code>Input</code>](#Input)  
**Returns**: <code>any</code> - Value for that binding  

| Param | Type | Description |
| --- | --- | --- |
| bind | <code>string</code> | Name of the binding to get the value of |

<a name="Input+_setInput"></a>

### input.\_setInput(key, val)
Sets the current value for a key

**Kind**: instance method of [<code>Input</code>](#Input)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Key to set the value for `keyCode.key` |
| val | <code>any</code> | Value to set |

