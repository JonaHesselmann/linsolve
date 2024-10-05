<!-- 
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
-->
<template>
    <div class="documentation-container">
      
      <iframe src="/linsolve/docs/jsdoc/index.html" class="documentation-frame"></iframe>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Documentation'
  }
  </script>
  
  <style scoped>
  html, body, #app {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  
  .documentation-container {
    width: 100vw;  
    height: 100vh; 
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
  }
  
  .documentation-frame {
    width: 100vw;  
    
    height: 100vh; 
    border: none;
  }
  </style>
  