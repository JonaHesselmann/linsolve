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
        <div class="Home">
          <br>
          <button class="mainButton" @click="optimizationStore.addConstraint()">{{ $t('addConstraint') }}</button>
         
      </div>
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