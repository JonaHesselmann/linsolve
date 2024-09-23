/**
 * Wandelt die Eingaben in das CPLEX-Format um.
 * @param {String} objectiveType - Minimisation or Maximisation
 * @param {string} objectiveFunction - The Function which is to be Maximised
 * @param {constraint[]} constraints - The constraints of the problem
 * @param {string[]} bounds - The Bounds of the problem
 * @param {string[]} variableTypes - to be included
 * @returns {string} - Das LP-Problem im CPLEX-Format.
 */
function generateLPFile(objectiveType,objectiveFunction, constraints =[], bounds = [], variableTypes = {}) {
    let lpFile = "";
    // Add the objective function (assuming "Minimize" by default)
    lpFile += objectiveType +"\n";
    lpFile += " obj: " + objectiveFunction + "\n";
    // Add constraints
    lpFile += "Subject To\n";
    constraints.forEach((constraint,index) => {
        lpFile += ` c${index + 1}: ${constraint.content}\n`;
    });
    //lpFile += "\n";
    // Add bounds if any
    if (bounds.length > 0) {
        lpFile += "Bounds\n";
        bounds.forEach((bound) => {
            lpFile += ` ${bound}\n`;
        });
        //lpFile += "\n";
    }

    // Add variable types if any
    if (Object.keys(variableTypes).length > 0) {
        if (variableTypes.general) {
            lpFile += "General\n";
            variableTypes.general.forEach((varName) => {
                lpFile += ` ${varName}\n`;
            });
            lpFile += "\n";
        }
        // add binary type if any
        if (variableTypes.binary) {
            lpFile += "Binary\n";
            variableTypes.binary.forEach((varName) => {
                lpFile += ` ${varName}\n`;
            });
            lpFile += "\n";
        }
    }

    // End of the LP file
    lpFile += "End\n";
    return lpFile;
}

export {generateLPFile}