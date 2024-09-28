<!-- 
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
-->



<script>
import Worker from './webworker.worker.js?worker'
    export default{
        name: "GeneralProblemInput",
      data() {
        return {
          problemInput: '' // This property will store the input of the textarea
        }
      },
      methods: {
        importProblem() {
          console.log('Imported Problem:', this.problemInput);
          // Additional logic for importing the problem
        },
        async solve() {
          try {
            const worker = new Worker(new URL('src/components/webworker.worker.js', import.meta.url))
            worker.postMessage({ problemInput: this.problemInput });

            worker.onmessage = (event) => {
              const result = event.data;
              if (result.error) {
                console.error("Worker Error:", result.error);
              } else {
                console.log("Worker Result:", result);
              }
            };
          } catch (error) {
            console.error("Failed to solve the optimization problem:", error);
          }
        }
      }
    }
</script>
<template>
  <div class="mainContent">
    <h2 class="mainTitel">{{ $t("gerneralProblem") }}</h2>
    <textarea
        class="problemInput"
        v-model="problemInput"
        :placeholder= "$t('writeHere')"> // add Localisation
        </textarea>
    <div class="buttoncontainer">
      <button class="mainButton" @click="importProblem">{{ $t("importProblem") }}</button>
      <button class="mainButton" @click="  solve">{{ $t("solve") }}</button>
    </div>
  </div>
</template>
<style scoped>

.mainContent {
    display: flex;
    flex-direction: column;
    align-items: center; 
    padding: 2rem; 
    padding-top: 0%;
    padding-bottom: 0%;
    min-height: 50vh; 
    box-sizing: border-box; 
    width: 100%; 
}

.mainTitel {
    margin: 0;
    font-size: 2.5rem; 
    text-align: center;
    width: 100%; 
    padding: 1rem 0;
}

.problemInput {
    width: 100%; 
    min-height: 20rem; 
    padding: 1.5rem;
    font-size: 1.2rem; 
    border: 1px solid #ccc;
    border-radius: 8px;
    resize: vertical; 
    box-sizing: border-box;
    margin-bottom: 2rem;
}

.buttoncontainer {
    display: flex;
    gap: 1rem; 
    justify-content: center; 
    width: 100%; 
}

.mainButton {
    padding: 1rem 2rem; 
    font-size: 1.2rem; 
    background-color: rgb(173, 170, 170);
    border: 1px solid black;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease; 
    flex: 1; 
    max-width: 300px; 
    
}

.mainButton:hover {
    background-color: rgb(140, 140, 140);
}

</style>


