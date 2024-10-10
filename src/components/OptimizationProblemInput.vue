<!-- 
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
-->


<script>
import { useOptimizationStore } from '../businesslogic/optimizationStore';
import { computed } from 'vue';
import { useMathematicalSolution} from '../businesslogic/mathematicalSolutionStore.js';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { ssrLooseContain } from 'vue/server-renderer';
export default {
  name: 'OptimizationProblemInput',
  data() {
        return {
            showPopup: false,    // Controls whether the main popup is shown
            showExamplePopup: false, // Controls whether the example popup is shown
            popupContent: "",    // Stores the content to be shown in the main popup
            showFileUploadDiv: false,
            
            
        };
    },
  setup() {
    const optimizationStore = useOptimizationStore();
    const mathematicalSolutionStore = useMathematicalSolution()
    const uploadedFileContent = ref("");

    const fileInput = ref(null);
    const isMinimizationSelected = computed(() => optimizationStore.selectedOptimization === 'Minimize');
    const isMaximizationSelected = computed(() => optimizationStore.selectedOptimization === 'Maximize');
    const triggerFileUpload = () => {
      fileInput.value.click();  // Simulate a click on the hidden input
    };
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const fileType = file.name.split('.').pop().toLowerCase();
        if (fileType === 'lp') {
          const reader = new FileReader();
          reader.onload = () => {
            const fileContent = reader.result;
            console.log("File content loaded:", fileContent);
            uploadedFileContent.value = fileContent; // Hier auf .value zugreifen
          };
          reader.readAsText(file);
        } else {
          alert('Nur .lp-Dateien sind erlaubt.');
        }
      }
    };
    /**
     * Solve LP
     */
    const solveLP = async () => {
      await mathematicalSolutionStore.solveProblem('spezific');

    };

    const solveFile = async () => {
      await mathematicalSolutionStore.solveProblem('file', uploadedFileContent.value);
    };

    const deleteConstraint = (id) => {
      optimizationStore.removeConstraint(id);
    };

    return {
      optimizationStore,
      isMinimizationSelected,
      isMaximizationSelected,
      solveLP,
      deleteConstraint,
      triggerFileUpload,
      handleFileUpload,
      fileInput,
      uploadedFileContent,
      solveFile
    }
  },
  watch: {
    // Initialize bounds when variables are loaded
    'optimizationStore.variables': {
      handler(newVariables) {
        // Initialize an empty bounds array for each variable
        this.bounds = newVariables.map(() => ({
          lowerBound: null,
          upperBound: null
        }));
      },
      immediate: true
    }
  },
  methods: {
    toggleFileUploadDiv() {
    this.showFileUploadDiv = !this.showFileUploadDiv;  // Toggle the visibility of the file upload div
    if (!this.showFileUploadDiv) {
      this.uploadedFileContent = "";  // Set the uploaded file content to an empty string
    }
  },

    updateLowerBound(index, variable) {
      const lowerBound = this.bounds[index].lowerBound;  // Get the current lower bound
      const upperBound = this.bounds[index].upperBound;  // Get the current upper bound

      // Log for debugging
      console.log(`Updating lower bound for ${variable}: ${lowerBound}`);

      // Update the bounds in the store
      this.optimizationStore.addBound(upperBound, lowerBound, variable);
    },

    updateUpperBound(index, variable) {
      const lowerBound = this.bounds[index].lowerBound;  // Get the current lower bound
      const upperBound = this.bounds[index].upperBound;  // Get the current upper bound

      // Log for debugging
      console.log(`Updating upper bound for ${variable}: ${upperBound}`);

      // Update the bounds in the store
      this.optimizationStore.addBound(upperBound, lowerBound, variable);
    }, 
    openPopup(type) {
            const currentLocale = this.$i18n.locale; // Access the app's current language

            // Set the popup content based on the button clicked
            if (type === 'bounds') {
               
                this.popupContent = this.$t('inputConstraint');
                
            } else if (type === 'optimization') {
               
                this.popupContent = this.$t('inputProblemType');
                
            } else if (type === 'condition') {
                
                this.popupContent = this.$t('inputCondition');
                
            } else if (type === 'constraint') {
           
                this.popupContent = this.$t('inputSideCondition');
                
            } 

            // Show the main popup
            this.showPopup = true;
        },
        closePopup() {
            // Close both the main and example popups
            this.showPopup = false;
           
        },
  }
};
</script>

<template>
  <div class="input-container">
    <h2 class="mainTitle">{{ $t("specificProblem") }}</h2>
    <div class="input-container__bounds">
      <div class="bounds-header">
      <p>{{ $t('bounds') }}:</p>
      <span class="material-icons themeTextColor help-icon" @click="openPopup('bounds')">help</span>
      </div>
      <div class="bound" v-for="(variable, index) in optimizationStore.variables" :key="variable" v-if="optimizationStore.variables.length > 0">
      
        <input
            type="number"
            class="boundTextField"
            v-model="bounds[index].lowerBound"
            @input="updateLowerBound(index, variable)"
        >
        <p class="boundText">≤ {{ variable }} ≤</p>

      
        <input
            type="number"
            class="boundTextField"
            v-model="bounds[index].upperBound"
            @input="updateUpperBound(index, variable)"
        >
      </div>
    </div>

    <div class="input-container__main-content">
      <div class="input-container__first-row sticky-buttons">
        <button
            class="input-container__selection-optimization"
            :class="{ 'input-container__selection-optimization--selected': isMinimizationSelected }"
            @click="optimizationStore.selectOptimization('Minimize')">
          {{ $t('minimization') }}
        </button>
        <button
            class="input-container__selection-optimization"
            :class="{ 'input-container__selection-optimization--selected': isMaximizationSelected }"
            @click="optimizationStore.selectOptimization('Maximize')">
          {{ $t('maximization') }}
        </button>
        <span class="material-icons themeTextColor help-icon" @click="openPopup('optimization')">help</span>
      </div>

      <div class="input-container__condition-container">
        <div class="condition-wrapper">
          <input type="text" class="input-container__condition" :placeholder="$t('condition')"
                 @input="optimizationStore.setObjectiveFunction($event.target.value), optimizationStore.addVariables($event.target.value)"
                 id="objectiveFunction">
                 <span class="material-icons themeTextColor help-icon" @click="openPopup('condition')">help</span>
        </div>
      </div>

      <div v-for="(constraint, index) in optimizationStore.constraints" :key="constraint.id" class="input-container__constraint-wrapper">
        <div class="constraint-wrapper">
          <input type="text"
                 class="input-container__constraint"
                 :placeholder="$t('constraint')"
                 @input="optimizationStore.updateConstraint(constraint.id, $event.target.value)"
          >
          <span v-if="index === 0" 
                class="material-icons themeTextColor help-icon" 
                @click="openPopup('constraint')">help</span>
          <!-- Platzhalter-Image für die erste Nebenbedingung -->
          <span v-show="index !== 0"
                class="material-icons themeTextColor delete-icon" 
                @click="deleteConstraint(constraint.id)">delete_forever</span>
        </div>
      </div>

      <div class="input-container__bounds_mobile">
        <div class="bounds-header">
      <p>{{ $t('bounds') }}:</p>
      <span class="material-icons themeTextColor help-icon" @click="openPopup('bounds')">help</span>
      </div>
        <div class="bound" v-for="(variable, index) in optimizationStore.variables" :key="variable" v-if="optimizationStore.variables.length > 0">
          
          <input
              type="number"
              class="boundTextField"
              v-model="bounds[index].lowerBound"
              @input="updateLowerBound(index, variable)"
          >
          <p class="boundText">≤ {{ variable }} ≤</p>

        
          <input
              type="number"
              class="boundTextField"
              v-model="bounds[index].upperBound"
              @input="updateUpperBound(index, variable)"
          >
        </div>
      </div>

      <div class="input-container__last-row">
        <button class="input-container__main-button" @click="toggleFileUploadDiv">{{ $t('uploadFile') }}</button>
        <button class="input-container__main-button" @click="optimizationStore.addConstraint()">{{ $t('addConstraint') }}</button>
        <router-link to="/result" class="input-container__main-button" @click="solveLP()">{{ $t('solve')}}</router-link>
      </div>
    </div>
  </div>
  <div v-if="showFileUploadDiv" class="popupOverlay">
        <div class="popupContent">
          <textarea v-model="uploadedFileContent" rows="10" cols="30" :placeholder="$t('fileInputField')" readonly id="uploadedFileArea"></textarea>
          <div>
          <button  @click="triggerFileUpload">
          {{ $t('uploadFile') }}
          </button>
         
          <router-link to="/result"  @click="solveFile" class="router-link">
          {{ $t('solve') }} </router-link>
        
          <button  @click="toggleFileUploadDiv">
          {{ $t('close') }} </button>
        </div>
        <input
          type="file"
          ref="fileInput"
          @change="handleFileUpload"
          accept=".lp"
          style="display: none"
        />
        </div>

    </div>

  <div v-if="showPopup" class="popupOverlay" @click="closePopup">
        <div class="popupContent" @click.stop>
            <p>{{ popupContent }}</p>
            <button @click="closePopup">{{ $t("close") }}</button>
        </div>
    </div>
</template>

<style scoped>
/* *{
  margin-top: 1%;
} */
.helperbounds{
  white-space: nowrap;
}

.popupContent textarea {
  width: 100%;
  padding: 5px;
  margin-top: 10px;
}
.mainTitle {
  margin: 0;
  font-size: 2.5rem;
  text-align: center;
  width: 100%;
  padding: 1rem 0;
  grid-column-start: 1;
  grid-column-end: 3;
}
.input-container {
  display: grid;
  grid-template-columns: 2fr 4fr;
  gap: 50px 150px;
  width: 100%;
  margin: 0 auto;
  padding: 5%;
  box-sizing: border-box;
  padding-top: 75px;
}

.input-container__bounds {
  position: sticky;
  top: 60px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
  grid-column-start: 1;
  grid-column-end: 2;
}

.input-container__bounds .bound {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.input-container__bounds_mobile {
  display: none;
}

.boundTextField {
  width: 80px;
  padding: 5px;
  font-size: 0.9rem;
}

.boundText {
  margin: 0 10px;
  font-size: 0.9rem;
  white-space: nowrap;
}

.input-container__main-content {
  grid-column-start: 2;
  grid-column-end: 3;
  display: flex;
  flex-direction: column;
  gap: 20px;
  /* padding-top: 60px; */ 
}

.input-container__first-row {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.input-container__selection-optimization {
  padding: 5px;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: end;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
  transition: background-color 0.3s, color 0.3s;
}

.input-container__selection-optimization--selected {
  background-color: rgba(7, 7, 152, 0.945);
  color: white;
}

.input-container__condition-container,
.input-container__constraint-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.input-container__condition,
.input-container__constraint {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.input-container__last-row {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.input-container__main-button {
  padding: 5px;
  margin: 1%;
  font-size: 1rem;
  background-color: rgb(173, 170, 170);
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
  width: auto;
  color: white;
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

.popupContent button:hover {
  background-color: rgb(140, 140, 140);
}

.router-link {
    align-self: center;  
    
    margin-left: 0.6rem;
    margin-right: 0.6rem;   
    padding: 0.8rem 1.5rem;
    background-color: #444;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    
}

.router-link:hover {
  background-color: rgb(140, 140, 140);
}

.popupDiv {
  box-sizing: flex;
}

.input-container__main-button:hover {
  background-color: rgb(140, 140, 140);
}

.constraint-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.delete-icon {
  cursor: pointer;
  margin-left: 10px;
}

.delete-icon.hidden {
  visibility: hidden;
}

.delete-icon:hover {
  opacity: 0.7;
}

.sticky-buttons {
  position: sticky;
  top: 0;
  z-index: 10;
  /* height: 60px; */
  display: flex;
  align-items: center;
  justify-content: center;
}

.help-icon {
  cursor: pointer;
  margin-left: 10px;
}

.condition-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}
.bounds-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

@media (max-width: 900px) {
  .input-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .input-container__bounds_mobile {
    display: block;
  }

  .input-container__bounds_mobile .bound {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
    flex-wrap: nowrap;
  }

  .boundTextField {
    flex: 1;
    min-width: 50px;
    padding: 5px;
    font-size: 1rem;
  }

  .boundText {
    margin: 0 10px;
    font-size: 1rem;
    white-space: nowrap;
  }

  .input-container__bounds {
    display: none;
  }

  .input-container__bounds_mobile .bound {
    flex-direction: row; 
  }

  .input-container__bounds_mobile {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .help-icon {
  cursor: pointer;
  margin-left: 0px;
}
}



</style>









