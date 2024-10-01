<!-- 
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
-->


<script>
import { useOptimizationStore } from '../businesslogic/optimizationStore';
import { computed } from 'vue'; 
import { useMathematicalSolution} from '../businesslogic/mathematicalSolutionStore.js';
import { useRouter } from 'vue-router';
export default {
  name: 'OptimizationProblemInput',
  setup() {
    const optimizationStore = useOptimizationStore();
    const mathematicalSolutionStore = useMathematicalSolution()
   

    const isMinimizationSelected = computed(() => optimizationStore.selectedOptimization === 'Minimize');
    const isMaximizationSelected = computed(() => optimizationStore.selectedOptimization === 'Maximize');

    /**
     * Solve LP
     */
    const solveLP = async () => {
     await mathematicalSolutionStore.solveProblem('spezific'); 
     
    };

    const deleteConstraint = (id) => {
      optimizationStore.removeConstraint(id);
    };

    return {
      optimizationStore,
      isMinimizationSelected,
      isMaximizationSelected,
      solveLP,
      deleteConstraint,
    }
  },
  watch: {
    // Initialize bounds when variables are loaded
    'optimizationStore.variables': {
      handler(newVariables) {
        // Initialize an empty bounds array for each variable
        this.bounds = newVariables.map(() => ({
          lowerBound: null,
          upperBound: null
        }));
      },
      immediate: true
    }
  },
  methods: {
    updateLowerBound(index, variable) {
      const lowerBound = this.bounds[index].lowerBound;  // Get the current lower bound
      const upperBound = this.bounds[index].upperBound;  // Get the current upper bound

      // Log for debugging
      console.log(`Updating lower bound for ${variable}: ${lowerBound}`);

      // Update the bounds in the store
      this.optimizationStore.addBound(upperBound, lowerBound, variable);
    },

    updateUpperBound(index, variable) {
      const lowerBound = this.bounds[index].lowerBound;  // Get the current lower bound
      const upperBound = this.bounds[index].upperBound;  // Get the current upper bound

      // Log for debugging
      console.log(`Updating upper bound for ${variable}: ${upperBound}`);

      // Update the bounds in the store
      this.optimizationStore.addBound(upperBound, lowerBound, variable);
    }
  }
};
</script>

<template>
  <div class="input-container">
    <div class="input-container__bounds">
      <p>{{ $t('bounds') }}:</p>
      <div class="bound" v-for="(variable, index) in optimizationStore.variables" :key="variable" v-if="optimizationStore.variables.length > 0">
        <input type="number" class="boundTextField" @input="firstInput = $event.target.value">
        <p class="boundText">≤ {{ variable }} ≤</p>
        <input type="number" class="boundTextField" @input="optimizationStore.addBound($event.target.value, firstInput, variable)">
      </div>
    </div>

    <div class="input-container__main-content">
      <div class="input-container__first-row sticky-buttons">
        <button
          class="input-container__selection-optimization"
          :class="{ 'input-container__selection-optimization--selected': isMinimizationSelected }"
          @click="optimizationStore.selectOptimization('Minimize')">
          {{ $t('minimization') }}
        </button>
        <button
          class="input-container__selection-optimization"
          :class="{ 'input-container__selection-optimization--selected': isMaximizationSelected }"
          @click="optimizationStore.selectOptimization('Maximize')">
          {{ $t('maximization') }}
        </button>
      </div>

      <div class="input-container__condition-container">
        <input type="text" class="input-container__condition" :placeholder="$t('condition')"
          @input="optimizationStore.setObjectiveFunction($event.target.value), optimizationStore.addVariables($event.target.value)" 
          id="objectiveFunction">
      </div>

      <div v-for="(constraint, index) in optimizationStore.constraints" :key="constraint.id" class="input-container__constraint-wrapper">
        <div class="constraint-wrapper">
          <input type="text"
            class="input-container__constraint"
            :placeholder="$t('constraint')"
            @input="optimizationStore.updateConstraint(constraint.id, $event.target.value)"
          >
          <!-- Platzhalter-Image für die erste Nebenbedingung -->
          <img 
            :class="{ hidden: index === 0 }" 
            src="../assets/trash.png" 
            @click="deleteConstraint(constraint.id)" 
            alt="Löschen" 
            class="delete-icon"
          />
        </div>
      </div>

      <div class="input-container__bounds_mobile">
        <p>{{ $t('bounds') }}:</p>
        <div class="bound" v-for="(variable, index) in optimizationStore.variables" :key="variable" v-if="optimizationStore.variables.length > 0">
          <!-- Lower Bound Input -->
          <input
              type="number"
              class="boundTextField"
              v-model="bounds[index].lowerBound"
              @input="updateBound(index, variable)"
          >
          <p class="boundText">≤ {{ variable }} ≤</p>

          <!-- Upper Bound Input -->
          <input
              type="number"
              class="boundTextField"
              v-model="bounds[index].upperBound"
              @input="updateBound(index, variable)"
          >
        </div>
      </div>

      <div class="input-container__last-row">
        <button class="input-container__main-button" @click="optimizationStore.addConstraint()">{{ $t('addConstraint') }}</button>
        <router-link to="/result" class="input-container__main-button" @click="solveLP()">{{ $t('solve')}}</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-container {
  display: grid;
  grid-template-columns: 2fr 4fr;
  gap: 150px;
  width: 100%;
  margin: 0 auto;
  padding: 5%;
  box-sizing: border-box;
  padding-top: 75px;
}

.input-container__bounds {
  position: sticky;
  top: 60px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
  grid-column-start: 1;
  grid-column-end: 2;
}

.input-container__bounds .bound {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.input-container__bounds_mobile {
  display: none;
}

.boundTextField {
  width: 80px;
  padding: 5px;
  font-size: 0.9rem;
}

.boundText {
  margin: 0 10px;
  font-size: 0.9rem;
  white-space: nowrap; 
}

.input-container__main-content {
  grid-column-start: 2;
  grid-column-end: 3;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 60px;
}

.input-container__first-row {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.input-container__selection-optimization {
  padding: 5px;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: end;
  cursor: pointer;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
  transition: background-color 0.3s, color 0.3s;
}

.input-container__selection-optimization--selected {
  background-color: rgba(7, 7, 152, 0.945);
  color: white;
}

.input-container__condition-container,
.input-container__constraint-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.input-container__condition,
.input-container__constraint {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.input-container__last-row {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.input-container__main-button {
  padding: 5px;
  margin: 1%;
  font-size: 1rem;
  background-color: rgb(173, 170, 170);
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
  width: auto;
  color: white;
}

.input-container__main-button:hover {
  background-color: rgb(140, 140, 140);
}

.constraint-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.delete-icon {
  cursor: pointer;
  width: 24px;
  height: 24px;
}

.delete-icon.hidden {
  visibility: hidden;
}

.delete-icon:hover {
  opacity: 0.7;
}

.sticky-buttons {
  position: sticky;
  top: 0;
  background-color: white; 
  z-index: 10;
  height: 60px; 
  display: flex;
  align-items: center;
  justify-content: center;
}


@media (max-width: 900px) {
  .input-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .input-container__bounds_mobile {
    display: block;
  }

  .input-container__bounds_mobile .bound {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
    flex-wrap: nowrap;
  }

  .boundTextField {
    flex: 1;
    min-width: 50px;
    padding: 5px;
    font-size: 1rem;
  }

  .boundText {
    margin: 0 10px;
    font-size: 1rem;
    white-space: nowrap;
  }

  .input-container__bounds {
    display: none;
  }

  .input-container__bounds_mobile .bound {
    flex-direction: row; 
  }

  .input-container__bounds_mobile {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>









