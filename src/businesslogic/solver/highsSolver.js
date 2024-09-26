import highs_loader from "highs";

/**
 * Loads the Highs Solver library.
 * @async
 * @function loadHighs
 * @returns {Promise<void>} - A promise that resolves when the Highs library is successfully loaded.
 * @throws {Error} - If the Highs library fails to load.
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

/**
 * Solves the LP problem using the Highs solver.
 * @param {string} lpContent - The content of the LP file in CPLEX format.
 * @returns {Promise<void>} - A promise that resolves when the LP problem has been solved.
 * @throws {Error} - If there is an error during the solving process.
 */
var result = 0;

async function solveLP(lpContent) {
    try {
        // Load the LP model into the solver and solve the LP problem
        result = await highs.solve(lpContent); // Solve the LP problem
        console.log(result);
        return result; // Return the result
    } catch (error) {
        console.error("Error while solving the LP problem:", error);
        throw error;
    }
}

/**
 * Returns the status and the objective value of the result.
 * @returns {[string, number]} - An array containing the status and the objective value of the result.
 */
function returnOptimalResult() {
    const { Status, ObjectiveValue } = result;
    
    return [Status, ObjectiveValue];
}

/**
 * Returns an array of tuples with the names of the variables and their primal values.
 * @returns {[string, number][]} - An array of tuples, where each tuple contains the variable name and its primal value.
 */
function returnVariables() {
    const returns = [];
    for (const columnKey in result.Columns) {
        const column = result.Columns[columnKey];
        returns.push([column.Name, column.Primal]);
    }
    return returns;
}

// Export the functions for use in other modules
export { solveLP, returnVariables, returnOptimalResult };


