/*
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
*/


import { defineStore } from 'pinia'; 
import { useOptimizationStore } from '../businesslogic/optimizationStore';
import * as highsSolver from "../businesslogic/solver/highsSolver.js";
import * as inputToLPInterface from "../businesslogic/inputToLPInterface.js";

/**
 * Constructor for the Store
 * @type {StoreDefinition<"mathematicalSolution", {solution: [], optimizationStore: *, optimalResult: []}, {}, {getRawArray(*): *, solveProblem(String, String): Promise<void>}>}
 */
export const useMathematicalSolution = defineStore('mathematicalSolution', {
  // The `state` function returns an object representing the reactive state of the store
  state: () => ({
    solution: [], 
    constraints:[],
    optimalResult:[],
    optimizationStore: useOptimizationStore(),  // Correct initialization of optimizationStore
  }),
  
  // Actions section: methods to modify the state or perform other logic
  actions: {
    /**
     * Returns the Array
     * @param array
     * @returns {*}
     */
      getRawArray(array){
        return array
      },


    /**
     * Solves the Problem
     * @param {String }problemKind Chooses the Solver
     * @param {String }data The Problem to be solved
     * @returns {Promise<void>}
     */
    async solveProblem (problemKind, data) {
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
        } catch (error) {
          console.error('Keine Lösung vorhanden:', error);
        }
      } else if (problemKind === 'general') {
        this.solution = this.getRawArray(data.get('VariableTable'))
        this.optimalResult =  data.get('Result')
        this.constraints =data.get('ConstrainTable')
        console.log(this.constraints)
      } else {
        alert('Es wurde ein nicht definiertes Problem versucht zu Lösen')
      }
    },
  }
});


