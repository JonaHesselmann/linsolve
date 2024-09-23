<script>
export default {
    name: 'selectionProblemButtons',
}
</script>

<template>
    <div class="mainButton_container">
        <div class="rowButton">
            <router-link to="/allgemeinesProblem" tag="button" class="mainButton">{{ $t("gernerallProblem") }}</router-link>
            <img src="../assets/questionmark.png" class="questionmark">
        </div>
        <div class="rowButton">
            <router-link to="/spezifischesProblem" tag="button" class="mainButton">{{ $t("specificProblem") }}</router-link>
            <img src="../assets/questionmark.png" class="questionmark">
        </div>
        <div class="rowButton">
            <button class="mainButton">{{ $t("importProblem") }}</button>
            <img src="../assets/questionmark.png" class="questionmark">
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
}

body {
    font-size: larger; 
}
</style>