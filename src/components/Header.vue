<!-- 
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
-->


<script>
import { languageStore } from '../businesslogic/languageStore.js'; 
import { useDropdownStore } from '../businesslogic/dropdownStore.js'; 
export default {
  name: "Header", 

  // `setup` function is part of Vue's Composition API to set up reactive state and logic
  setup(){
    // Accessing the language store to manage localization (i18n)
    const i18nStore = languageStore();

    // Accessing the dropdown store to manage the state of the language dropdown
    const dropdown = useDropdownStore();

   
    return { i18nStore, dropdown };
  },

 
  methods: {
    // Method to change the current language (locale) by calling the `setLocale` action from the language store
    changeLocale(locale){
      this.i18nStore.setLocale(locale); // Updates the locale in both the store and the i18n instance
    },

    // Method to toggle the state of the language dropdown menu by calling `toggleDropdown` action from the dropdown store
    toggleLanguageDropdown(){
      this.dropdown.toggleDropdown(); 
    }
  }
};
</script>

<template>
  <header class="header">
    <img src="../assets/Logo.png" class="logo">
    <h1 class="title">LinSolve</h1>
    <img src="../assets/globe.png" alt="language selection" class="globe"  @click="toggleLanguageDropdown()">
    <p class="language" @click="toggleLanguageDropdown()">{{ $t('language') }}</p>
    <div v-if="dropdown.isOpen" class="dropdown-menu">
       <p class="dropdown-link" @click="changeLocale('de')">Deutsch</p>
       <p class="dropdown-link" @click="changeLocale('en')">English</p>
    </div>
  </header>
  
      
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  padding-top: 5rem; 
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  background-color: rgba(7, 7, 152, 0.945);
  color: white;
  z-index: 1000;
}



.title {
  flex-grow: 1;
  font-size: calc(1.5rem + 1vw);
  text-align: center;
  margin: 0 auto;
}

.globe {
  height: calc(10px + 1vw);
  width: calc(10px + 1vw);
  margin-left: auto;
  cursor: pointer;
}

.language {
  padding-left: 3px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 20px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1001;
  display: none;
}

.dropdown-link {
  display: block;
  padding: 12px 16px;
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.dropdown-link:hover {
  background-color: #f1f1f1;
}

.header:hover .dropdown-menu {
  display: block;
}

.logo {
  height: 3%;
  width: 3%;
  margin-left: auto;
  cursor: pointer;
}


</style>


