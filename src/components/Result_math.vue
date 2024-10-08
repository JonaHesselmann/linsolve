<!-- 
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
-->

<script>
import { useMathematicalSolution } from '../businesslogic/mathematicalSolutionStore.js'

export default {
  name: "resultMath",
  setup() {
    const mathematicalSolutionStore = useMathematicalSolution();

    // Assuming tableData is a prop passed from the parent or can be directly accessed
    const variableTableData = mathematicalSolutionStore.solution;
    const constraintTableData =mathematicalSolutionStore.constraints;
    return {
      mathematicalSolutionStore,
      variableTableData,
      constraintTableData
    };
  }
}
</script>

<template>
  <div>
    <h2>{{ $t('mathematicallySolution') }}</h2>  
    </div>

    <div>
      <p>{{ $t('variable') }}</p>
      <table v-if="variableTableData.length" class="solution-table">
        <thead>
        <tr>
          <th v-for="(header, index) in variableTableData[0]" :key="index">{{ header }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(row, rowIndex) in variableTableData.slice(1)" :key="rowIndex">
          <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div>
      <p>{{ $t('constraint') }}</p>
      <table v-if="constraintTableData.length" class="solution-table">
        <thead>
        <tr>
          <th v-for="(header, index) in constraintTableData[0]" :key="index">{{ header }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(row, rowIndex) in constraintTableData.slice(1)" :key="rowIndex">
          <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="results-container" v-if="mathematicalSolutionStore.optimalResult[0] === 'Optimal'">
      <div class="result-card">
        <h3>{{ $t('objectiveFunctionValue') }}</h3>
        <p>{{ $t('optimalValue') }} <strong>{{ mathematicalSolutionStore.optimalResult[1] }}</strong></p>
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

.solution-table th,
.solution-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  white-space: nowrap; /* Prevent breaking of text */
}

.solution-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.solution-table td {
  font-size: 18px;
}

.results-container {
  margin-top: 20px;
}

.result-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  background-color: #f9f9f9;
}
</style>
