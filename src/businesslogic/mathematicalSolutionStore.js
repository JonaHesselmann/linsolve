import { defineStore } from 'pinia'; 
import { useOptimizationStore } from '../businesslogic/optimizationStore';
import * as highsSolver from "../businesslogic/solver/highsSolver.js";
import * as inputToLPInterface from "../businesslogic/inputToLPInterface.js";
// Defining a new store for managing the state of the mathematical solution 
export const useMathematicalSolution = defineStore('mathematicalSolution', {
  // The `state` function returns an object representing the reactive state of the store
  state: () => ({
    solution: [], 
    optimalResult:[],
    optimizationStore: useOptimizationStore(),  // Correct initialization of optimizationStore
  }),
  
  // Actions section: methods to modify the state or perform other logic
  actions: {
    /**
     * Calles the right Solverfunction and sets the Solutions
     */
    async solveProblem (problemKind) {
      if (problemKind === 'spezific') {
        try {
          let lpContent;
          // Access optimizationStore via 'this'
          console.log(this.optimizationStore.selectedOptimization);
          lpContent = inputToLPInterface.generateLPFile(
            this.optimizationStore.$state.selectedOptimization, 
            this.optimizationStore.getObjectiveFunction, 
            this.optimizationStore.constraints, 
            this.optimizationStore.getProblemBounds, 
            ""
          );
          console.log(lpContent);
          const result = await highsSolver.solveLP(lpContent); // Solve the LP
          console.log(result);
          // TODO: Handle the result and move to the solved result
        } catch (error) {
          console.error('Fehler beim Lösen des LP-Problems:', error);
        }
        
        try {
          this.solution = highsSolver.returnVariables(); 
          console.log(this.solution);
          this.optimalResult = highsSolver.returnOptimalResult();
          console.log('TEST' + this.optimalResult);
        } catch (error) {
          console.error('Keine Lösung vorhanden:', error);
        }
      } else if (problemKind === 'general') {
        // TODO: Put the Logic for gernal Problems
      } else {
        alert('Es wurde ein nicht definiertes Problem versucht zu Lösen')
      }
    },
  }
});


