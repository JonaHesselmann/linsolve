/*
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
*/



/**
 * Uses the input fields and transcribes to CPLEX .
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

