<!-- 
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
-->

<template>
    <Header></Header>
    <GoToHomepage class="GoToHomepage"></GoToHomepage>
    <AboutUs class="mainContent"></AboutUs>
    <Footer></Footer>
</template>

<script>
import Header from '../components/Header.vue';
import AboutUs from '../components/About_us.vue';
import Footer from '../components/Footer.vue';
import GoToHomepage from '../components/goToHomepage.vue';

export default {
    name: 'About',
    components: {
        Header,
        Footer,
        AboutUs,
        GoToHomepage
    }
}
</script>

<style scoped>
.mainContent {
    margin-top: 10%;
    margin-bottom: 10%;
}

.go-to-homepage {
    margin: 0 auto;
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
}

@media only screen and (max-width: 480px) {
    .mainContent {
        margin-top: 100px;
    }
}

@media (max-width: 768px) {
    .mainContent {
        margin-top: 120px;
    }
}
</style>
