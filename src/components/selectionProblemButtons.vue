<!-- 
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
-->
<script>
export default {
    name: 'selectionProblemButtons',
    data() {
        return {
            showPopup: false,    // Controls whether the main popup is shown
            showExamplePopup: false, // Controls whether the example popup is shown
            popupContent: "",    // Stores the content to be shown in the main popup
            exampleContent: "",  // Stores the content for the example popup
            type:""
        };
    },
    methods: {
        openPopup(type) {
            const currentLocale = this.$i18n.locale; // Access the app's current language

            // Set the popup content based on the button clicked
            if (type === 'general') {
                // Display the main content for the general problem without using v-html
                this.popupContent = this.$t('generalProblemInfo');
                this.type='general'
                // Set the content for the example popup
                this.exampleContent = this.$t('generalProblemExample');
            } else if (type === 'specific') {
                // Set content for the specific problem popup
                this.popupContent = this.$t('specificProblemInfo');
                this.type='specific'
            } 

            // Show the main popup
            this.showPopup = true;
        },
        closePopup() {
            // Close both the main and example popups
            this.showPopup = false;
            this.showExamplePopup = false;
        },
        closeExamplePopup() {
            // Close only the example popup
            this.showExamplePopup = false;
        },
        openExamplePopup() {
            // Open the example popup for general problem
            this.showExamplePopup = true;
        }
    }
}
</script>

<template>
    <div class="mainButton_container">
        <div class="rowButton">
            <router-link to="/allgemeinesProblem" tag="button" class="mainButton">{{ $t("gerneralProblem") }}</router-link>
            <span class="material-symbols-outlined themeTextColor questionmark" @click="openPopup('general')">help</span>
        </div>
        <div class="rowButton">
            <router-link to="/spezifischesProblem" tag="button" class="mainButton">{{ $t("specificProblem") }}</router-link>
            <span class="material-symbols-outlined themeTextColor questionmark" @click="openPopup('specific')">help</span>
        </div>
    </div>

    <div v-if="showPopup" class="popupOverlay" @click="closePopup">
        <div class="popupContent" @click.stop>
            <p>{{ popupContent }}</p>
            <a v-if="type==='general'" @click="openExamplePopup" style="color: blue; text-decoration: underline; cursor: pointer; margin-right: 3%;">{{ $t('showExample') }}</a>
            <button @click="closePopup">{{ $t("close") }}</button>
        </div>
    </div>

    <div v-if="showExamplePopup" class="popupOverlay" @click="closeExamplePopup">
        <div class="popupContent" @click.stop>
            <pre>{{ exampleContent }}</pre>
            <button @click="closeExamplePopup">{{ $t("close") }}</button>
        </div>
    </div>
</template>

<style scoped>
.mainButton_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%; 
    padding: 2rem; 
}

.rowButton {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 90%; 
    max-width: 50rem; 
    margin-bottom: 2rem; 
}

.mainButton {
    flex-grow: 1; 
    font-size: larger; 
    max-height: 20%;
    background-color: rgb(140, 140, 140);
    border: 1px solid black;
    text-align: left; 
    cursor: pointer;
    border-radius: 0.5rem;
    transition: all 0.3s ease; 
}

.mainButton:hover {
    background-color: #444;
    color: #f1f1f1;
    font-weight: bolder;
}

.questionmark {
    width: 5vw; 
    max-width: 20px; 
    height: auto; 
    margin-left: 1rem; 
    align-self: center; 
    cursor: pointer;
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

button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #444;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
}

button:hover {
    background-color: #666;
}

a {
    cursor: pointer;
}

</style>
