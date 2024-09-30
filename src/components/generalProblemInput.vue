<script>
import { useGMPLStore } from "../businesslogic/useGMPLStore.js";
import { CalculateGMPL } from "../businesslogic/solver/glpk_Wasm_binding.js";

export default {
  name: "GeneralProblemInput",
  setup() {
    const gmplStore = useGMPLStore();

    const solve = async () => {
      try {
        const result = CalculateGMPL(gmplStore.problemInput);
        console.log(result); // Handle the result as needed
      } catch (error) {
        console.error('Failed to solve the optimization problem:', error);
      }
    };

    return {
      gmplStore,
      solve,
    };
  },
  methods: {
    handleInput(event) {
      const inputText = event.target.value;
      this.gmplStore.updateProblemInput(inputText);
      this.gmplStore.updateSuggestionPosition(event.target);
    },
    selectSuggestion(suggestion) {
      this.gmplStore.insertSuggestion(suggestion);
    }
  }
};
</script>

<template>
  <div class="mainContent">
    <h2 class="mainTitel">{{ $t("gerneralProblem") }}</h2>
    <div class="inputContainer">
      <textarea
        class="problemInput"
        v-model="gmplStore.problemInput"
        @input="handleInput"
        :placeholder="$t('writeHere')"
      ></textarea>
      <ul
        v-if="gmplStore.suggestions.length > 0"
        class="suggestionsList"
        :style="{ top: gmplStore.suggestionPosition.top + 'px', left: gmplStore.suggestionPosition.left + 'px' }"
      >
        <li v-for="(suggestion, index) in gmplStore.suggestions" :key="index" @click="selectSuggestion(suggestion)">
          {{ suggestion }}
        </li>
      </ul>
    </div>
    <div class="buttoncontainer">
      <button class="mainButton" @click="gmplStore.importProblem">{{ $t("importProblem") }}</button>
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
  min-height: 50vh;
  width: 100%;
}

.mainTitel {
  margin: 0;
  font-size: 2.5rem;
  text-align: center;
  width: 100%;
  padding: 1rem 0;
}

.inputContainer {
  position: relative;
  width: 100%;
}

.problemInput {
  width: 100%;
  min-height: 20rem;
  padding: 1.5rem;
  font-size: 1.2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: vertical;
  margin-bottom: 2rem;
}

.suggestionsList {
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-height: 150px;
  overflow-y: auto;
  z-index: 1;
}

.suggestionsList li {
  padding: 0.5rem;
  cursor: pointer;
}

.suggestionsList li:hover {
  background-color: #f0f0f0;
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
