    <!-- 
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
-->


<template>
    <Header></Header>
    <GoToHomepage class="GoToHomepage"></GoToHomepage>
    <PrivacyPolicyLinSolve class="mainContent"></PrivacyPolicyLinSolve>
    <Footer></Footer>
    </template>
    <script>
    import Header from '../components/Header.vue';
    import Footer from '../components/Footer.vue';
    import GoToHomepage from '../components/goToHomepage.vue';
    import PrivacyPolicyLinSolve from '../components/PrivacyPolicyLinSolve.vue';

    export default{
        name: 'PrivacyPolicyLinSolvePage',
        components:{
            Header, 
            Footer, 
            PrivacyPolicyLinSolve, 
            GoToHomepage,
        }
    }
    </script>
    <style>
    .mainContent{
        margin-top: 15%;
        margin-bottom: 10%;
    }
    .GoToHomepage{
         margin-top: 1%;
    }
    </style>
