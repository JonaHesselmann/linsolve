import highs_loader from "highs";


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

async function solveLP(lpContent) {
  try {
    // Das LP-Modell in den Solver laden
     result = await highs.solve(lpContent); // Löst das LP-Problem
      console.log(result)
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


export { solveLP,returnVariables,returnOptimalResult }; // Exportiert die Funktion zur Verwendung in anderen Modulen

