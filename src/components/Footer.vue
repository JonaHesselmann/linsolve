<!-- 
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
-->


<script>
    export default{
        name:'Footer',
        methods: {
    openDocumentation(event) {
        event.preventDefault();
      // This will open the documentation in a new tab when the "Documentation" link is clicked
      window.open('/linsolve/docs/jsdoc/index.html', '_blank');
    }
  }
    }
</script>
<template>
    <footer class="footer">
        <a href="/docs/jsdoc/index.html" @click="openDocumentation($event)" class="footer-link">{{ $t('documentation') }}</a>
        <router-link to="/about" class="footer-link">{{ $t('aboutUs') }}</router-link>
        <router-link to="/agb" class="footer-link">{{ $t('gtcs') }}</router-link>
        <router-link to="/imprint" class="footer-link">{{ $t('imprint') }}</router-link>
        <router-link to="privacyPolicy" class="footer-link">{{ $t("privacyPolicy") }}</router-link>
    </footer>
</template>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.footer {
  position: fixed;         
  bottom: 0;                 
  left: 0;                
  width: 100%;            
  background-color: rgba(7, 7, 152, 0.945);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  flex-wrap: nowrap;
}

.footer-link {
  color: white;
  padding: 0.5rem;
  text-align: center;
  font-size: 1rem;
  transition: color 0.3s ease-in-out, font-weight 0.3s ease-in-out;
}

.footer-link:hover {
  color: #f1f1f1;
  font-weight: bolder;
}

@media (max-width: 480px) {
  .footer {
    padding: 0.5rem 0;
    flex-wrap: nowrap; 
  }

  .footer-link {
    width: 40%; 
    text-align: center;
    font-size: xx-small;
    padding: 0.4rem;

  }
  }



</style>

