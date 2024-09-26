import { defineStore } from 'pinia';

/**
 * A store for managing optimization problems, including state and actions related to
 * objective functions, constraints, and variable bounds.
 * 
 * @type {StoreDefinition<"optimization", {
 *   objectiveFunction: string,
 *   selectedOptimization: string,
 *   constraints: Array<{id: number, content: string}>,
 *   variables: Array<string>,
 *   bounds: Array<string>
 * }, {
 *   getObjectiveFunction(): string,
 *   selectedOptimizationLabel(state): string,
 *   getProblemBounds(): Array<string>
 * }, {
 *   setObjectiveFunction(objectiveFunc: string): void,
 *   updateConstraint(id: number, content: string): void,
 *   selectOptimization(option: string): void,
 *   addConstraint(): void,
 *   removeConstraint(id: number): void,
 *   addBound(upperBound: string, lowerBound: string, variable: string): void,
 *   addVariables(condition: string): void,
 *   deleteConstraint(): void
 * }>}
 */
export const useOptimizationStore = defineStore('optimization', {
    /**
     * State of the optimization store, containing the selected optimization type,
     * constraints, variables, objective function, and bounds.
     * 
     * @returns {Object} - The state object with properties.
     */
    state: () => ({
        selectedOptimization: 'Minimize', // Default optimization type
        constraints: [{id: 0, content: ''}], // Array to hold constraints
        variables: [], // Array to hold variable names
        objectiveFunction: '', // The current objective function
        bounds: [], // Array to hold bounds for the variables
    }),

    /**
     * Getters to derive state information from the store's state.
     */
    getters: {
        /**
         * Returns a human-readable label for the selected optimization ('Minimization' or 'Maximization').
         * 
         * @param state {Object} - The state of the store.
         * @returns {string} - The label for the selected optimization.
         */
        selectedOptimizationLabel(state) {
            return state.selectedOptimization === 'Minimize' ? 'Minimize' : 'Maximize';
        },
        
        /**
         * Returns the current objective function as a string.
         * 
         * @returns {string} - The current objective function.
         */
        getObjectiveFunction() {
            return this.objectiveFunction;
        },
        
        /**
         * Returns the bounds for the variables as an array.
         * 
         * @returns {Array<string>} - The bounds for the optimization problem.
         */
        getProblemBounds() {
            return this.bounds;
        },
    },

    /**
     * Actions section: Methods that modify the state or perform logic.
     */
    actions: {
        /**
         * Sets the selected optimization type ('Minimize' or 'Maximize').
         * 
         * @param {string} option - The optimization type to set.
         */
        selectOptimization(option) {
            this.selectedOptimization = option;
        },

        /**
         * Analyzes the given condition string and extracts variable names, excluding known functions.
         * 
         * @param {string} condition - The condition to extract variables from.
         */
        addVariables(condition) {
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
         * Adds or updates the bounds of the specified variable.
         * 
         * @param {string} upperBound - The upper bound for the variable.
         * @param {string} lowerBound - The lower bound for the variable.
         * @param {string} variable - The variable for which the bounds are set.
         */
        addBound(upperBound, lowerBound, variable) {
            console.log(`Adding bound: upperBound=${upperBound}, lowerBound=${lowerBound}, variable=${variable}`);

            const existingIndex = this.bounds.findIndex(bound => bound.includes(variable));
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

            if (existingIndex !== -1) {
                console.log(`Updating existing bound for ${variable}`);
                this.bounds[existingIndex] = newBound;
            } else {
                console.log(`Adding new bound for ${variable}: ${newBound}`);
                this.bounds.push(newBound);
            }
        },

        /**
         * Adds a new constraint to the list of constraints.
         */
        addConstraint() {
            this.constraints.push({ id: Date.now(), content: '' });
        },

        /**
         * Removes a constraint from the store based on its ID.
         * 
         * @param {number} id - The ID of the constraint to remove.
         */
        removeConstraint(id) {
            this.constraints = this.constraints.filter(constraint => constraint.id !== id);
        },

        /**
         * Sets the objective function for the optimization problem.
         * 
         * @param {string} objectiveFunc - The objective function to set.
         */
        setObjectiveFunction(objectiveFunc) {
            this.objectiveFunction = objectiveFunc;
        },

        /**
         * Updates the content of a specific constraint identified by its ID.
         * 
         * @param {number} id - The ID of the constraint to update.
         * @param {string} content - The new content for the constraint.
         */
        updateConstraint(id, content) {
            const index = this.constraints.findIndex((c) => c.id === id);
            if (index !== -1) {
                this.constraints[index] = { ...this.constraints[index], content }; // Create a new object to ensure reactivity
            }
            console.log(this.constraints[0]);
        },

        /**
         * Deletes the most recently added constraint from the list.
         */
        deleteConstraint() {
            this.constraints.pop();
        },
    },
});

