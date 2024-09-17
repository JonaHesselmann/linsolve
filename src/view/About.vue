<template>
    <Header></Header>
    <AboutUs class="mainContent"></AboutUs>
    <Footer></Footer>
    </template>
    <script>
    import Header from '../components/Header.vue';
    import AboutUs from '../components/About_us.vue';
    import Footer from '../components/Footer.vue';
    export default{
        components:{
            Header, 
            Footer, 
            AboutUs
        }
    }
    </script>
    <style>
    .mainContent{
        margin-top: 15%;
        margin-bottom: 10%;
    }
    </style>