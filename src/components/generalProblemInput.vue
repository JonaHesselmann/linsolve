<!--
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
-->
<script>
import { useMathematicalSolution } from "../businesslogic/mathematicalSolutionStore.js";
import { useEditorStore } from "../businesslogic/useEditorStore.js";
import { useRouter } from 'vue-router';
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  name: "GeneralProblemInput",
  setup() {
    const editorContainer = ref(null); 
    const editorStore = useEditorStore();  // Use the Pinia store where Codemirror is initialized

    // Mount the Codemirror editor
    onMounted(() => {
      if (editorContainer.value) {
        editorStore.initEditor(editorContainer.value, ''); // Initialize Codemirror
      }
    });

    const router = useRouter();
    const mathematicalSolutionStore = useMathematicalSolution();
    let data;

    // Solve function to get the content from Codemirror
    const solve = async () => {
      // Get the content from the Codemirror editor
      const problemInput = editorStore.editor.state.doc.toString();  // Get the content from Codemirror
      console.log(problemInput);  // This will log the Codemirror content

      // Create a new web worker
      const workwork = new Worker(new URL('./webworker.worker.js', import.meta.url));

      // Handle messages from the worker
      workwork.onmessage = (e) => {
        // Log the data received from the worker
        console.log(e.data);
        data = e.data;
        mathematicalSolutionStore.solveProblem('general', data);
        router.push("/result");
      };

      // Handle errors from the worker
      workwork.onerror = (e) => {
        console.error(e);
      };

      // Send the problem input to the worker
      workwork.postMessage(problemInput);
    };


    return {
      editorContainer,
      solve,
    };
  },
};
</script>


<template>
  <div class="mainContent">
    <h2 class="mainTitel">{{ $t("gerneralProblem") }}</h2>
    <div class="inputContainer">
      <div
        ref="editorContainer" class="problemInput"
        contenteditable="true"

        :placeholder="$t('writeHere')"
      ></div>
     
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
