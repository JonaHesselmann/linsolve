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