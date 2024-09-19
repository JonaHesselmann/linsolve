<script>
import 'mathlive';
import { useOptimizationStore } from '../businesslogic/optimizationStore';
import { computed } from 'vue';
import * as highsSolver from "../businesslogic/solver/highsSolver.js";
import * as inputToLPInterface from "../businesslogic/inputToLPInterface.js";


export default {
  name: 'OptimizationProblemInput',
  setup() {
    const optimizationStore = useOptimizationStore();


    const isMinimizationSelected = computed(() => optimizationStore.selectedOptimization === 'Minimize');
    const isMaximizationSelected = computed(() => optimizationStore.selectedOptimization === 'Maximize');


    /**
     * Solve LP
     */
    const solveLP = async () => {
      try {
        let lpContent;
        console.log(optimizationStore.selectedOptimization);
        lpContent = inputToLPInterface.generateLPFile(optimizationStore.$state.selectedOptimization,optimizationStore.getObjectiveFunction,optimizationStore.constraints,["0 <= x1 <= 5",
          "0 <= x2 <= 10"],"")
        console.log(lpContent);
        const result = await highsSolver.solveLP(lpContent); // Solve the LP
       console.log(result);
       //TODO: Here we can apply the move to the solved results via router
      } catch (error) {
        console.error('Fehler beim Lösen des LP-Problems:', error);
      }
    };

    return {
      optimizationStore,
      isMinimizationSelected,
      isMaximizationSelected,
      solveLP,
    };
  },
};
</script>
<template>
  <div class="input-container">
    <div class="input-container__bounds">
      <div class="bound" v-for="variable in optimizationStore.variables" :key="variable">
        <input type="number" class="boundTextField">
        <p class="boundText">≤ {{ variable }} ≤</p>
        <input type="number" class="boundTextField">
      </div>
    </div>

    <div class="input-container__main-content">
      <div class="input-container__first-row">
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
        <input type="text" class="input-container__condition" placeholder="Bedingung"
          @input="optimizationStore.setObjectiveFunction($event.target.value)" id="objectiveFunction">
      </div>

      <div class="input-container__constraint-container">
        <input type="text"
          v-for="constraint in optimizationStore.constraints"
          :key="constraint.id"
          class="input-container__constraint"
          placeholder="Nebenbedingung"
          @input="optimizationStore.updateConstraint(constraint.id, $event.target.value)">
      </div>
          <div class="input-container__bounds_mobile">
      <div class="bound" v-for="variable in optimizationStore.variables" :key="variable">
        <input type="number" class="boundTextField">
        <p class="boundText">≤ {{ variable }} ≤</p>
        <input type="number" class="boundTextField">
      </div>
          </div>
      <div class="input-container__last-row">
        <button class="input-container__main-button" @click="optimizationStore.addConstraint()">{{ $t('addConstraint') }}</button>
        <button class="input-container__main-button" @click="solveLP()">{{ $t('solve')}}</button>
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
}

.input-container__bounds {
  position: sticky;
  top: 20px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  grid-column-start: 1;
  grid-column-end: 2;
}

.input-container__bounds .bound {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
.input-container__bounds_mobile{
  display:none
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
  font-size: 0.8rem;
  background-color: rgb(173, 170, 170);
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
  width: auto;
}

.input-container__main-button:hover {
  background-color: rgb(140, 140, 140);
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







