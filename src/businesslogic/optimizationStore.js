import { defineStore } from 'pinia';

/**
 * Defining a new store to manage the state and actions related to optimization problems
 * @type {StoreDefinition<"optimization", {objectiveFunction: string, selectedOptimization: string, constraints: []}, {getObjectiveFunction(): *, selectedOptimizationLabel(*): string}, {setObjectiveFunction(*): void, updateConstraint(*, string): void, selectOptimization(*): void, addConstraint(): void}>}
 */
export const useOptimizationStore = defineStore('optimization', {
    // `state` function returns an object representing the reactive state of the store
    state: () => ({
        selectedOptimization: 'Minimize',
        constraints: [{0:''}],
        variables:[], 
        objectiveFunction: '',
        bounds:[],
    }),

    // Getters are used to compute derived state from the store's state
    getters: {
        /**
         *  Returns a human-readable label for the selected optimization ('Minimization' or 'Maximization')
         * @param state {state}
         * @returns {string}
         */
        selectedOptimizationLabel(state) {
            return state.selectedOptimization === 'Minimize' ? 'Minimize' : 'Maximize';
        },
        /**
         * returns the Constraints as Strings
         * @returns {string}
         */
        getObjectiveFunction(){
            return this.objectiveFunction;
        },
        /**
         * Get Bounds
         * @returns {Array}
         */
        getProblemBounds(){
            return this.bounds;
        },
    },

    // Actions section: methods that allow modifying the state or performing logic
    actions: {
        // Action to set the selected optimization type ('minimization' or 'maximization')
        /**
         * Setter for the Option
         * @param option
         */
        selectOptimization(option) {
            this.selectedOptimization = option;
        },
        /**
         * Add all Variables that are used in the condition
         * @param {String} condition - the Condition to be added
         */
        addVariables(condition){
            const characters = [...condition]; 
            let variables = new Set(); 
            let currentVariable = ''; 
            let insideVariable = false; 
          
            
            for (let i = 0; i < characters.length; i++) {
              const char = characters[i];
          
             
              if (/[a-zA-Z_]/.test(char)) {
                
                currentVariable += char;
                insideVariable = true;
              } else if (/\d/.test(char) && insideVariable) {
                currentVariable += char;
              } else {
               
                if (insideVariable && currentVariable !== '') {
                  variables.add(currentVariable);
                }
                currentVariable = '';
                insideVariable = false;
              }
            }
        
            if (currentVariable !== '') {
              variables.add(currentVariable);
            }
          
           
            const knownFunctions = ["sin", "cos", "log", "exp", "sqrt", "tan", "Math"];
            const result = [...variables].filter(v => !knownFunctions.includes(v));
            this.variables = result;
        },
        /**
         * Function to Add or Update the Bounds of the Variables
         */
        addBound(upperBound, lowerBound, variable) {
            // Debug logging to ensure the method is being called
            console.log(`Adding bound: upperBound=${upperBound}, lowerBound=${lowerBound}, variable=${variable}`);

            const existingIndex = this.bounds.findIndex(bound => bound.includes(variable));

            // Initialize the newBound variable based on the provided bounds
            let newBound = '';
            if (lowerBound !== '' && upperBound !== '') {
                newBound = `${lowerBound} <= ${variable} <= ${upperBound}`;
            } else if (lowerBound !== '') {
                newBound = `${lowerBound} <= ${variable}`;
            } else if (upperBound !== '') {
                newBound = `${variable} <= ${upperBound}`;
            } else {
                console.log("Both bounds are null, nothing to add.");
                return; // No bounds to add if both are null
            }

            // Check if there's already a bound for the variable
            if (existingIndex !== -1) {
                console.log(`Updating existing bound for ${variable}`);
                this.bounds[existingIndex] = newBound;
            } else {
                console.log(`Adding new bound for ${variable}: ${newBound}`);
                this.bounds.push(newBound);
            }
        },


        /**
         *  Action to add a new constraint to the list of constraints
         */
        addConstraint() {
            
            this.constraints.push({ id: Date.now(), content: '' });
            
        },

        removeConstraint(id) {
            this.constraints = this.constraints.filter(constraint => constraint.id !== id);
          },
        //Setter for Objective Function
        /**
         * Setter for the Objectivefuction
         * @param objectiveFunc
         */
        setObjectiveFunction(objectiveFunc){
            this.objectiveFunction = objectiveFunc;
        },
        // Action to update the content of a specific constraint identified by its `id`
        /**
         * Updates the Constraint of the given Constraint
         * @param id
         * @param content {string}
         */
        updateConstraint(id, content) {

            // Find the index of the constraint to be updated
            const index = this.constraints.findIndex((c) => c.id === id);

            // If the constraint exists, update its content
            if (index !== -1) {
                // Use Vue's reactivity to update the constraint
                this.constraints[index] = { ...this.constraints[index], content }; // Create a new object to ensure reactivity
            }
            console.log(this.constraints[0]);
        },
        /**
         * Deletes the Constraint on the stack
         */
        deleteConstraint(){
            this.constraints.pop()
        },

    },
});
