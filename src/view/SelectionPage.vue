<template>
    <Header></Header>
    <SelectionProblemButtons></SelectionProblemButtons>
    <Footer></Footer>
    </template>
    <script>
    import Header from '../components/Header.vue';
    import Footer from '../components/Footer.vue';
    import SelectionProblemButtons from '../components/selectionProblemButtons.vue';
    export default{
        name: 'SelectionPage',
        components:{
            Header, 
            Footer, 
            SelectionProblemButtons
        }
    }
    </script>
    <style>
    </style>