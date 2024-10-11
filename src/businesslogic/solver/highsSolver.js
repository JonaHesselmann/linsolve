/*
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
*/


import highs_loader from "highs";
import {data} from "happy-dom/lib/PropertySymbol.d.ts.js";


/**
 * Läd den Solver
 */
let highs;
(async () => {
    try {
        highs = await highs_loader({
            locateFile: (file) => "https://lovasoa.github.io/highs-js/" + file
        });
        console.log("Highs library loaded successfully.");
    } catch (error) {
        console.error("Failed to load the Highs library:", error);
    }

})();


//console.log(lpString);
/**
 * Löst das LP-Problem mit Highs.
 * @param {string} lpContent - Der Inhalt der LP-Datei im CPLEX-Format.
 * @returns {Promise<void>} - Ein Promise, das aufgelöst wird, wenn das Problem gelöst ist.
 */
var result =0;
var Timetaken;

async function solveLP(lpContent) {
  try {
    // Das LP-Modell in den Solver laden
      const beginningtime = Date.now();
     result = await highs.solve(lpContent); // Löst das LP-Problem
      Timetaken = Date.now() -beginningtime;
      const solution = new Array();
      solution.push(result.Status,result.ObjectiveValue);
      const map = new Map;
      map.set('Result', solution);
      map.set('VariableTable', formatSolutionToArray(result));
      map.set('ConstrainTable', returnConstraints(result));
      map.set('Walltime', Timetaken);
      console.log(map);
      console.log(Timetaken);
      console.log(formatSolutionToArray(result));
    return result; // Ergebnis zurückgeben
  } catch (error) {
    console.error("Fehler beim Lösen des LP-Problems:", error);
    throw error;
  }
}

/**
 * Returns the Status and the Value of the Result
 * @returns {*[]}
 */
function returnOptimalResult(){
    const { Status, ObjectiveValue } = result;

    return [Status, ObjectiveValue];

}

/**
 * Returns an Array of tuples with the name of the Variable and its primal vaule
 * @returns {*[]}
 */
function returnVariables(){
  const returns = [];
    for (const columnKey in result.Columns) {
        const column = result.Columns[columnKey];
        returns.push([column.Name, column.Primal]);
    }
    return returns;
}
function returnTimeTaken(){
    return Timetaken;
}
function formatSolutionToArray(solution) {

    const result = [];

    // Add headers for the columns
    const columnHeaders = [
        'Variable Name',
        'Type',
        'Lower Bound',
        'Upper Bound',
        'Primal Value',
        'Dual Value',
    ];
    result.push(columnHeaders);


    for (const key in solution.Columns) {
        const col = solution.Columns[key];
        result.push([
            col.Name,
            col.Type,
            col.Lower,
            col.Upper === Infinity ? '+inf' : col.Upper,
            col.Primal,
            col.Dual,
        ]);
    }

    // Add headers for the rows
    const rowHeaders = [
        'Constraint Name',
        'Lower Bound',
        'Upper Bound',
        'Primal Value',
        'Dual Value',
    ];
    result.push(rowHeaders);

    // Process each row
    for (const row in solution.Rows) {
        result.push([
            row.Name,
            row.Lower === -Infinity ? '-inf' : row.Lower,
            row.Upper === Infinity ? '+inf' : row.Upper,
            row.Primal,
            row.Dual,
        ]);
    }


    return result;
}
/**
 * Returns an Array of tuples with the name of the Variable and its primal value
 * @returns {*[]} - Array of Name with Primal vales
 */
function returnConstraints(solution) {
    const result = [];

    // Add headers for the rows
    const rowHeaders = [
        'Constraint Name',
        'Lower Bound',
        'Upper Bound',
        'Primal Value',
        'Dual Value',
    ];
    result.push(rowHeaders);
    for(const key in solution.Rows) {
        const row = solution.Rows[key];
        result.push([
            row.Name,
            row.Lower === -Infinity ? '-inf' : row.Lower,
            row.Upper === Infinity ? '+inf' : row.Upper,
            row.Primal,
            row.Dual,
        ]);
        return result;
    }
}





export { solveLP,returnVariables,returnOptimalResult,returnTimeTaken}; // Exportiert die Funktion zur Verwendung in anderen Modulen

