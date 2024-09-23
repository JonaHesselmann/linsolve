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

async function solveLP(lpContent) {
  try {
    // Das LP-Modell in den Solver laden
    const result = await highs.solve(lpContent); // Löst das LP-Problem
    return result; // Ergebnis zurückgeben
  } catch (error) {
    console.error("Fehler beim Lösen des LP-Problems:", error);
    throw error;
  }
}



export { solveLP }; // Exportiert die Funktion zur Verwendung in anderen Modulen

