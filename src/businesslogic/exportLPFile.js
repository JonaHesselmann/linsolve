/*
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
*/

import { generateLPFile } from "./inputToLPInterface";

function exportLPFile(format, optimizationStore) {
    // Generiere den LP-Dateiinhalt mit der Funktion
    let lpContent;
    // Access optimizationStore via parameter
    console.log(optimizationStore.selectedOptimization);
    lpContent = generateLPFile(
      optimizationStore.selectedOptimization, 
      optimizationStore.getObjectiveFunction, 
      optimizationStore.constraints, 
      optimizationStore.getProblemBounds, 
      ""
    );

    // Hier ist die Browser-basierte Lösung zum Herunterladen:
    const blob = new Blob([lpContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `problem.${format}`;
    link.click();
}

export { exportLPFile };