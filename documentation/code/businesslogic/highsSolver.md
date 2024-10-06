# Documentation

## `let highs`

Constructor for Highs.js Solver. Loads the WASM File from the github Repository

## `async function solveLP(lpContent)`

Solves the Problem.

* **Parameters:** `lpContent` — `string` — - the Probleminput in  CPLEX-Format.
* **Returns:** `Promise<void>` — - Ein Promise, which is cleared when solved.

## `function returnOptimalResult()`

Returns the Status and the Value of the Result

* **Returns:** `String[]` — - Status and Result
* **Deprecated**

## `function returnConstraints(solution)`

Returns an Array of tuples with the name of the Variable and its primal value

* **Returns:** `*[]` — - Array of Name with Primal vales

## `function formatSolutionToArray(Sol)`

Returns the Columns in proper format

* **Parameters:** `Sol` — the Result
* **Returns:** `*[]` — 
