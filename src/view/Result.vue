<!-- 
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
-->
<template>
  <Header></Header>
  <div  v-if="isExportVisible"  class="button-container">
    <button @click="exportResults()" class="export-button">
      <span class="material-icons">ios_share</span>
        {{ $t("exportProblem") }}
    </button>
  </div>
  <GoToHomepage class="GoToHomepage"></GoToHomepage>
  <Result_math class="mainContent"></Result_math>
  <Footer></Footer>
</template>

<script>
import { computed } from 'vue';
import Header from '../components/Header.vue';
import Result_math from '../components/Result_math.vue';
import Footer from '../components/Footer.vue';
import GoToHomepage from '../components/goToHomepage.vue';
import { exportLPFile } from '../businesslogic/exportLPFile';
import { useOptimizationStore } from '../businesslogic/optimizationStore'; 
import { useMathematicalSolution } from '../businesslogic/mathematicalSolutionStore.js'

export default {
name: 'Result',
components: {
  Header,
  Footer,
  Result_math,
  GoToHomepage,
},
setup() {
  const optimizationStore = useOptimizationStore();
  const mathematicalSolutionStore = useMathematicalSolution();
  
  const exportResults = () => {
    const format = 'lp'; 
    exportLPFile(format, optimizationStore);
  };

  const isExportVisible = computed(() => {
      return mathematicalSolutionStore.problemKind === 'spezific' || 
             mathematicalSolutionStore.problemKind === 'file';
    });

  return {
    exportResults,
    optimizationStore,
    isExportVisible
  };
},
beforeRouteLeave(to, from, next) {
  const mathematicalSolutionStore = useMathematicalSolution();
  const optimizationStore = useOptimizationStore();
  
  console.log("Leaving the route...");
  mathematicalSolutionStore.reset();
  optimizationStore.reset();
  next(); 
}
}
</script>

<style scoped>

.go-to-homepage {
  margin-left: 0;
  margin-top: 0; 
  position: relative; 
  top: -20px; 
  margin-bottom: 30px; 
}


.mainContent {
  margin-top: 6%;
  margin-bottom: 2%;
}


.export-button {
  position: absolute; 
  right: 20px; 
  top: 100px; 
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  font-size: 1rem;
  background-color: rgb(173, 170, 170);
  border-radius: 4px;
  transition: background-color 0.3s;
  color: white;
}

.export-button:hover {
  background-color: rgb(140, 140, 140);
}

.export-icon {
  width: 24px;
  height: 24px;
}


@media only screen and (max-width: 480px) {
  .export-button {
    right: 10px;
    top: 80px;
    font-size: small;
  }

  .export-icon {
    width: 18px;
    height: 18px;
  }

  .mainContent {
    margin-top: 80px; 
  }
}

@media (max-width: 768px) {
  .mainContent {
    margin-top: 100px;
  }
}

</style>
