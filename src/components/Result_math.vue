<script>
import { useMathematicalSolution } from '../businesslogic/mathematicalSolutionStore.js'

export default {
  name: "resultMath",
  setup() {
    const mathematicalSolutionStore = useMathematicalSolution();

    const variableTableData = mathematicalSolutionStore.solution;
    const constraintTableData = mathematicalSolutionStore.constraints;
    const runtime = mathematicalSolutionStore.walltime; // Extract runtime from store

    return {
      mathematicalSolutionStore,
      variableTableData,
      constraintTableData,
      runtime // Return runtime to template
    };
  }
}
</script>

<template>
  <div class="result-math-container">
    <h2>{{ $t('mathematicallySolution') }}</h2>

    <div v-if="variableTableData.length < 1">
      <p> {{ $t("solutionErrorMessage") }}</p>
    </div>

    <div v-if="variableTableData.length > 1">
      <p>{{ $t('variable') }}</p>
      <div class="table-wrapper">
        <table v-if="variableTableData.length" class="solution-table">
          <thead>
          <tr>
            <th v-for="(header, index) in variableTableData[0]" :key="index">{{ header }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(row, rowIndex) in variableTableData.slice(1)" :key="rowIndex">
            <td v-for="(cell, cellIndex) in row" :key="cellIndex" :data-label="variableTableData[0][cellIndex]">{{ cell }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="constraintTableData.length > 1">
      <p>{{ $t('constraint') }}</p>
      <div class="table-wrapper">
        <table v-if="constraintTableData.length" class="solution-table">
          <thead>
          <tr>
            <th v-for="(header, index) in constraintTableData[0]" :key="index">{{ header }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(row, rowIndex) in constraintTableData.slice(1)" :key="rowIndex">
            <td v-for="(cell, cellIndex) in row" :key="cellIndex" :data-label="constraintTableData[0][cellIndex]">{{ cell }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Results -->
    <div class="results-container" v-if="mathematicalSolutionStore.optimalResult[0] === 'Optimal'">
      <div class="result-card">
        <h3>{{ $t('objectiveFunctionValue') }}</h3>
        <p>{{ $t('optimalValue') }} <strong>{{ mathematicalSolutionStore.optimalResult[1] }}</strong></p>
      </div>
    </div>

    <!-- Runtime Display -->
    <div class="runtime-container">
      <div class="runtime-card">
        <h3>{{ $t('runtime') }}</h3>
        <p>{{ $t('executionTime') }}: <strong>{{ runtime }} ms</strong></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* General Styles (Desktop First) */
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

/* Results card style */
.results-container {
  margin-top: 20px;
}

.result-card, .runtime-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background-color: #f9f9f9;
}

/* Runtime container for displaying runtime */
.runtime-container {
  margin-top: 20px;
}

.runtime-card {
  text-align: center;
}

/* Responsive design for mobile */
@media (max-width: 768px) {
  /* Hide the th elements on mobile */
  .solution-table thead{
    display: none !important;
  }

  /* Make td display as block on mobile for a stacked look */
  .solution-table,
  .solution-table thead,
  .solution-table tbody,
  .solution-table th,
  .solution-table td,
  .solution-table tr {
    display: block;
  }

  .solution-table tr {
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }

  .solution-table td {
    display: block;
    padding: 12px 15px;
    text-align: left;
    position: relative;
    border: none;
    font-size: 16px;
    word-wrap: break-word;
  }

  .solution-table td:before {
    content: attr(data-label);
    display: block;
    margin-bottom: 6px;
    font-weight: bold;
    color: #555;
  }

  .solution-table tr:nth-child(odd) {
    background-color: #fafafa;
  }

  /* Runtime card styles for mobile */
  .runtime-card {
    font-size: 14px;
    padding: 10px;
    border: none;
  }

  .runtime-card strong {
    font-size: 16px;
  }
}

@media (min-width: 769px) {
  .solution-table {
    display: table;
  }

  .solution-table thead th,
  .solution-table td {
    display: table-cell;
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
  }

  .solution-table tr {
    display: table-row;
  }

  .solution-table td:before {
    content: none;
  }

  /* Runtime card styles for desktop */
  .runtime-card {
    text-align: center;
    font-size: 18px;
  }
}
</style>
