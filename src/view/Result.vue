<!-- 
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
-->


<script>
import Header from '../components/Header.vue';
import Result_math from '../components/Result_math.vue';
import Footer from '../components/Footer.vue';
import GoToHomepage from '../components/goToHomepage.vue';
import { exportLPFile } from '../businesslogic/exportLPFile';
import { useOptimizationStore } from '../businesslogic/optimizationStore'; // Importieren Sie den Store

export default {
  name: 'Result',
  components: {
    Header,
    Footer,
    Result_math,
    GoToHomepage,
  },
  setup() {
    const optimizationStore = useOptimizationStore(); // Initialisieren Sie den Store

    const exportResults = () => {
      const format = 'lp'; // oder ein anderes Format, das Sie verwenden möchten
      exportLPFile(format, optimizationStore);
    };

    return {
      exportResults,
      optimizationStore
    };
  }
}
</script>
<template>
    <Header></Header>
    <div class="button-container">
      <button @click="exportResults()" class="export-button">
        <img src="../assets/export.png" alt="Export" class="export-icon" />
        Problem Exportieren
      </button>
    </div>
    <GoToHomepage class="GoToHomepage"></GoToHomepage>
    <Result_math class="mainContent"></Result_math>
    <Footer></Footer>
</template>
    
<style>
.mainContent{
    margin-top: 6%;
    margin-bottom: 2%;
}
.GoToHomepage{
         margin-top: 1%;
    }
    .button-container {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  position: absolute;
  top: 90px;
  right: 10px;
}

.export-button {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px;
  font-size: 1rem;
  background-color: rgb(173, 170, 170);
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
  color: white;
  margin-top: 6%;
}

.export-button:hover {
  background-color: rgb(140, 140, 140);
}

.export-icon {
  width: 24px;
  height: 24px;
}

/* Anpassungen für kleinere Bildschirme (Handy < 480px) */
@media only screen and (max-width: 480px) {
  .button-container {
    top: 80px;  
    right: 5px; 
  }

  .export-button {
    padding: 8px;  
    font-size: x-small;  
    margin-top: 8%;     
  }
  .export-icon {
    width: 18px;  
    height: 18px;
  }
}

</style>

