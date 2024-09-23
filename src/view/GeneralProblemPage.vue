<template>
    <Header></Header>
    <GeneralProblemInput></GeneralProblemInput>
    <Footer></Footer>
    </template>
    <script>
    import Header from '../components/Header.vue';
    import Footer from '../components/Footer.vue';
    import GeneralProblemInput from '../components/generalProblemInput.vue';
    export default{
        name:"GerneralProblemPage",
        components:{
            Header, 
            Footer, 
            GeneralProblemInput
        }
    }
    </script>
    <style>
    </style>