<script>
import { useMathematicalSolution } from '../businesslogic/mathematicalSolutionStore.js'
export default{
  name: "resultMath", 
  setup(){
      const mathematicalSolutionStore = useMathematicalSolution()
      return {
      mathematicalSolutionStore,
    };
    }
  }
</script>
<template>
<div>
    <h2> {{ $t('mathematicallySolution') }} </h2>
    <p v-if="mathematicalSolutionStore.optimalResult[0]!='Optimal'">{{ $t('solutionErrorMessage') }}</p>
    <table class="solution-table" v-if="mathematicalSolutionStore.optimalResult[0] ==='Optimal'">
      <thead>
        <tr>
          <th>{{ $t('variable') }}</th>
          <th>{{ $t('optimalValue') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(solution, index) in mathematicalSolutionStore.solution" :key="index">
          <td>{{ solution[0] }}</td>
          <td>{{ solution[1] }}</td>
        </tr>
      </tbody>
    </table>
    <div class="results-container" v-if="mathematicalSolutionStore.optimalResult[0] ==='Optimal'">
  <div class="result-card" >
    <h3>{{ $t('objectiveFunctionValue') }}</h3>
    <p> {{ $t('optimalValue') }} <strong>{{ mathematicalSolutionStore.optimalResult[1] }}</strong></p>
  </div>

  
</div>

    
</div> 

</template>
<style>
.solution-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

.solution-table th, .solution-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.solution-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.solution-table td {
  font-size: 18px;
}
.accordion {
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 300px;
  margin: 0 auto;
}

.accordion-item {
  margin: 10px 0;
}

.accordion-header {
  background-color: #f0f0f0;
  border: none;
  padding: 10px;
  text-align: left;
  font-size: 1.1em;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.accordion-header:hover {
  background-color: #ddd;
}

.accordion-content {
  background-color: white;
  padding: 10px;
  display: none;
}

.accordion-header.active + .accordion-content {
  display: block;
}

</style>