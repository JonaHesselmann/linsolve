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

    mathVirtualKeyboard.layouts = ["compact"];

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
      <math-field class="input-container__condition" placeholder="Objective Function" @input="optimizationStore.setObjectiveFunction($event.target.value)" id="objectiveFunction"></math-field>
    </div>

    <div class="input-container__constraint-container">
      <math-field 
        v-for="constraint in optimizationStore.constraints" 
        :key="constraint.id"
        class="input-container__constraint"
        placeholder="Constraint"
        @input="optimizationStore.updateConstraint(constraint.id, $event.target.value)">
      </math-field>
    </div>

    <div class="input-container__last-row">
      <button class="input-container__main-button" @click="optimizationStore.addConstraint()">{{ $t('addConstraint') }}</button>
      <button class="input-container__main-button" @click="solveLP()">{{ $t('solve') }}</button>
    </div>
  </div>
</template>

<style scoped>

.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 5%;
  box-sizing: border-box;
}

.input-container__first-row {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 15px;
  gap: 10px;
}

.input-container__selection-optimization {
  flex-grow: 0.5;
  padding: 5px;
  font-size: calc(0.5rem + 0.5vw);
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
  align-items: center;
  width: 100%;
  gap: 10px;
}


.input-container__condition {
  width: 100%;
  height: 4rem;
  max-width: 600px;
  padding: 5%;
  margin-top: 10px;
  font-size: calc(1rem + 0.3vw);
  box-sizing: border-box;
}

.input-container__constraint {
  width: 100%;
  max-width: 550px;
  padding: 5%;
  margin-top: 10px;
  font-size: calc(1rem + 0.3vw);
  box-sizing: border-box;
}

.input-container__last-row {
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 100%;
  margin-top: 20px;
  gap: 10px;
}


.input-container__main-button {
  flex-grow: 1;
  padding: calc(5px + 0.5vw);
  font-size: calc(0.5rem + 0.3vw);
  margin: 0 10px;
  text-align: center;
  background-color: rgb(173, 170, 170);
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.input-container__main-button:hover {
  background-color: rgb(140, 140, 140);
}

</style>
