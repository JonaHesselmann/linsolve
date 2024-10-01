<!-- 
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
-->


<script>
export default{
    name: 'AboutUs'
}
</script>
<template>
    <div>
       <h1 class="mainTitle">
           {{ $t('aboutUsHeadline') }}
        </h1>
        <br>
        <p class="mainText">   {{$t('aboutUsText')}} 💻
        </p>
        
    </div>
</template>
<style scoped>
.mainTitle{
  font-size: large;
}
.mainText{
  font-size: medium;
  color: #333;
}
</style>

