<script setup>
import welcome from "../../assets/img/HenryMoon.png";
import { ref } from "vue";
const index = ref(false);
setTimeout(() => {
  index.value = true;
}, 3000);
</script>
<template>
  <div
    :class="[index ? 'index' : 'notIndex']"
    class="welcome h-screen bg-black absolute overflow-hidden z-40 flex justify-center items-center"
  >
    <img :src="welcome" alt="Henry Moon Welcome" />
  </div>
</template>

<style lang="scss" scoped>
// Definimos la animación
.welcome {
  animation: welcome 2s linear forwards;

  @keyframes welcome {
    0% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }
}

.index{
  z-index: 0;
}
</style>