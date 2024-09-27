<!-- 
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
-->


<script>
    export default{
        name:'Footer',
    }
</script>
<template>
    <footer class="footer">
        <a class="footer-link">{{ $t('documentation') }}</a>
        <router-link to="/about" class="footer-link">{{ $t('aboutUs') }}</router-link>
        <router-link to="/agb" class="footer-link">{{ $t('gtcs') }}</router-link>
    </footer>
</template>
<style>
 * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.footer{
    position: fixed;         
    bottom: 0;                 
    left: 0;                
    width: 100%;            
    display: flex;
    background-color:  rgba(7, 7, 152, 0.945) ;
    color: white;
    justify-content: center;
    align-items: center;
    }
.footer-link{
    padding: 1rem;
    color: white;
}
.footer-link:hover {
  color: #f1f1f1;
  font-weight: bolder;
}

</style>

