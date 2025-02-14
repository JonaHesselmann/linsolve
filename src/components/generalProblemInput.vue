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
  data() {
        return {
            showPopup: false,    // Controls whether the main popup is shown
            popupContent: "",    // Stores the content to be shown in the main popup
            
        };
    },
  methods: {
        openPopup() {
            const currentLocale = this.$i18n.locale; // Access the app's current language

            this.popupContent = this.$t('generalProblemExample');
            this.showPopup = true;
        },
        closePopup() {
            // Close both the main and example popups
            this.showPopup = false;
           
        },
       
    },
  setup() {
    const editorContainer = ref(null);
    const editorStore = useEditorStore();  // Use the Pinia store where Codemirror is initialized
    const fileInput = ref(null);

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
      let missingWords = [];

      if (!problemInput.includes("end")) {
        missingWords.push("end");
      }
      if (!problemInput.includes("maximize") && !problemInput.includes("minimize")) {
        missingWords.push("maximize or minimize");
      }
      if (!problemInput.includes("solve")) {
        missingWords.push("solve");
      }

      if (missingWords.length > 0) {

        if (typeof alert === 'function') {
          alert("Missing words: " + missingWords.join(", "));
          router.push("/result");
        } else {
          console.log("Missing words: " + missingWords.join(", "));
          router.push("/result");
        }
      } else {
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
      }
      // Handle messages from the worker

    };

    const triggerFileUpload = () => {
      fileInput.value.click(); // Simulate a click on the hidden file input
    };

    const handleFileUpload = (event) => {
      const file = event.target.files[0]; // Get the first selected file
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const fileContent = reader.result; // Get the content of the file
          editorStore.editor.dispatch({
            changes: { from: 0, to: editorStore.editor.state.doc.length, insert: fileContent }, // Insert content into the editor
          });
          console.log("File content loaded into editor:", fileContent);  // Log the file content
        };
        reader.readAsText(file); // Read the file as text
      }
    };


    return {
      editorContainer,
      solve,
      triggerFileUpload,
      handleFileUpload,
      fileInput,
    };
  },
};
</script>

<template>
  <div class="mainContent">
    <h2 class="mainTitel">{{ $t("gerneralProblem") }}</h2>
    <div class="inputContainer">
      <div class="problemInputWrapper">
        <div
          ref="editorContainer" class="problemInput"
          contenteditable="true"
          :placeholder="$t('writeHere')"
        ></div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="themeTextColor help-icon" @click="openPopup()"><path d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
      </div>
    </div>
    <div class="buttoncontainer">
      <button class="mainButton" @click="triggerFileUpload">{{ $t("importProblem") }}</button>


<input
  type="file"
  ref="fileInput"
  @change="handleFileUpload"
  style="display: none"
  accept=".mod"
/>

      <button class="mainButton" @click="solve">{{ $t("solve") }}</button>
    </div>
  </div>

  <div v-if="showPopup" class="popupOverlay" @click="closePopup">
        <div class="popupContent" @click.stop>
            <p>{{ popupContent }}</p>
            <a v-if="type==='general'" @click="openExamplePopup" style="color: blue; text-decoration: underline; cursor: pointer; margin-right: 3%;">{{ $t('showExample') }}</a>
            <button @click="closePopup">{{ $t("close") }}</button>
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
  white-space: noWrap;
}

.problemInputWrapper {
  display: flex;
  align-items: flex-start;
  gap: 10px;
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

.help-icon {
  width: 32px;
  height: 32px;
  cursor: pointer;
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
.popupOverlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}


.popupContent {
    padding: 2rem;
    border-radius: 0.5rem;
    width: 80%;
    max-width: 30rem;
    text-align: left;
    white-space: pre-wrap; 
    word-wrap: break-word; 
    overflow-wrap: anywhere; 
    overflow-x: auto; 
}

.popupContent button {
    align-self: center;  
    margin-top: 2rem;   
    padding: 0.8rem 1.5rem;
    background-color: #444;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
}
@media (max-width: 768px) {
  .mainContent {
    padding: 1rem;
  }

  .mainTitel {
    font-size: 1.8rem;
    padding: 0.5rem 0;
  }

  .inputContainer {
    width: 100%;
  }

  .problemInput {
    font-size: 1rem;
    padding: 1rem;
    min-height: 15rem;
  }

  .buttoncontainer {
    flex-direction: row;
    justify-content: space-between; 
    gap: 0.5rem;
  }

  .mainButton {
    padding: 0.5rem 1rem; 
    font-size: 0.9rem; 
    max-width: 100%; 
  }

  .help-icon {
    width: 20px;
    height: 20px;
    margin-left: 5px;
  }

  .popupContent {
    padding: 1.5rem;
    width: 90%;
  }

  .popupContent button {
    margin-top: 1.5rem;
    padding: 0.7rem 1.2rem;
    font-size: 1rem;
  }
}


</style>