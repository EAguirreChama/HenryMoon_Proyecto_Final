<script setup>
import error from '../assets/img/404.svg'
</script>

<template>
  <div class="box">
    <img class="img"  :src="error" />
    <p>We're sorry, it's not possible to land on this route</p>
    <p>Lo sentimos, no es posible aterrizar en esta ruta</p>
  </div>
</template>


<style lang="scss" scoped>
.img{
  width: 25%;
  height: auto;
  margin-bottom: 50px;
}

.box{
  font-size: 25px;
  color: var(--title);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding: 100px;
  width: 100%;
  height: 800px;
}
</style>
