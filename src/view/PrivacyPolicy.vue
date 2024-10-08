    <!-- 
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
-->
<template>
    <Header></Header>
    <GoToHomepage class="go-to-homepage"></GoToHomepage>
    <PrivacyPolicyLinSolve class="mainContent"></PrivacyPolicyLinSolve>
    <Footer class="footer"></Footer>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import GoToHomepage from '../components/goToHomepage.vue';
import PrivacyPolicyLinSolve from '../components/PrivacyPolicyLinSolve.vue';

export default {
    name: 'PrivacyPolicyLinSolvePage',
    components: {
        Header, 
        Footer, 
        PrivacyPolicyLinSolve, 
        GoToHomepage,
    }
}
</script>

<style scoped>
/* Main content styling */
.mainContent {
    margin-top: 10%;
    margin-bottom: 10%;
    padding: 20px;
    text-align: center;
}
.go-to-homepage {
    margin: 0 auto;
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
}


@media only screen and (max-width: 480px) {
    .mainContent {
        margin-top: 80px; 
    }
    .go-to-homepage {
        margin-bottom: 30px;
    }
}

@media (max-width: 768px) {
    .mainContent {
        margin-top: 100px;
    }
}
</style>

  