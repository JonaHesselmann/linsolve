<!-- 
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
-->

<template>
    <div class="arrow-container">
        <router-link to="/" class="arrow-link">
          <span class="material-symbols-outlined themeTextColor">arrow_back</span>
            <p class="themeTextColor">{{ $t('goHome') }}</p>
        </router-link>
    </div>
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

.arrow-container {
  position: absolute;
  top: calc(5rem + 1rem); 
  left: 2rem; 
}

.arrow-link {
  display: inline-flex; 
  align-items: center; 
  text-decoration: none; 
  color: blackx;
}

.arrow {
  width: 2rem;
  height: 2rem;
  margin-right: 0.5rem; 
}

p {
  font-size: 1rem;
  margin: 0;
  color: black;
}

@media (prefers-color-scheme: dark) {
  p {
    color: white;
  }
  .arrow-link {
    color: white;
  }
}
</style>
