<script>
    import Header from '../components/Header.vue';
    import Result_math from '../components/Result_math.vue';
    import Footer from '../components/Footer.vue';
    export default{
        name:'Result',
        components:{
            Header, 
            Footer, 
            Result_math
        }
    }
    </script>
<template>
    <Header></Header>
    <Result_math></Result_math>
    <Footer></Footer>
</template>
    
<style>
</style>