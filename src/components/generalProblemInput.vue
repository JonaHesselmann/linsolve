
<script>
import * as glpk from "../businesslogic/solver/glpk_solver.cjs"


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
        solve() {
          console.log('Solving Problem:', this.problemInput);
          console.log(glpk.solveLP(this.problemInput));
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
        placeholder= "Write here"> // add Localisation
        </textarea>
    <div class="buttoncontainer">
      <button class="mainButton" @click="importProblem">{{ $t("importProblem") }}</button>
      <button class="mainButton" @click="solve">{{ $t("solve") }}</button>
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