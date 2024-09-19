import { defineStore } from 'pinia';


/**
 * Defining a new store to manage the state and actions related to optimization problems
 * @type {StoreDefinition<"optimization", {objectiveFunction: string, selectedOptimization: string, constraints: []}, {getObjectiveFunction(): *, selectedOptimizationLabel(*): string}, {setObjectiveFunction(*): void, updateConstraint(*, string): void, selectOptimization(*): void, addConstraint(): void}>}
 */
export const useOptimizationStore = defineStore('optimization', {
    // `state` function returns an object representing the reactive state of the store
    state: () => ({
        selectedOptimization: 'Minimize',
        constraints: [],
        variables:[], //TODO --> delete the hard Coded Variables 
        objectiveFunction: '',
        
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
         *  Action to add a new constraint to the list of constraints
         */
        addConstraint() {
            
            this.constraints.push({ id: Date.now(), content: '' });
            
        },
        //Setter for Objectiv Function
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
        deleteConstraint(){
            this.constraints.pop()
        },

    },
});
