<script setup>
import loading from '../../assets/img/spiner.gif'
</script>
<template>
  <div class="box">
    <img :src="loading" alt="loading"/>
  </div>
</template>

<style lang="scss" scoped>
.box{
  width: 700px;
}
</style>
