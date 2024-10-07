---
title: inputToLPInterface
---

# inputToLPInterface

<a name="generateLPFile"></a>

## generateLPFile(objectiveType, objectiveFunction, constraints, bounds, variableTypes) ⇒ <code>string</code>
Uses the input fields and transcribes to CPLEX .

**Kind**: global function  
**Returns**: <code>string</code> - - Das LP-Problem im CPLEX-Format.  

| Param | Type | Description |
| --- | --- | --- |
| objectiveType | <code>String</code> | Minimisation or Maximisation |
| objectiveFunction | <code>string</code> | The Function which is to be Maximised |
| constraints | <code>Array.&lt;constraint&gt;</code> | The constraints of the problem |
| bounds | <code>Array.&lt;string&gt;</code> | The Bounds of the problem |
| variableTypes | <code>Array.&lt;string&gt;</code> | to be included |

