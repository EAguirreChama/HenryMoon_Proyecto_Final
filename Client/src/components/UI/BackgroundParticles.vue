<script setup>
import { ref } from "vue";
import ParticlesOne from "./ParticlesOne.vue";
import ParticlesTwo from "./ParticlesTwo.vue";
const width = ref(window.innerWidth);
const refreshWidth = () => {
  width.value = window.innerWidth;
};
setInterval(refreshWidth, 100);
</script>
<template>
  <div
    class="--contain-- bg-transparent left-0 absolute w-screen z-0 top-0 h-screen overflow-hidden"
  >
    <div v-if="width < 500" class="bubbles relative flex">
      <ParticlesOne />
      <ParticlesTwo />
    </div>
    <div v-if="width > 500 && width <= 600" class="bubbles relative flex">
      <ParticlesOne />
      <ParticlesTwo />
    </div>
    <div v-if="width > 810 && width < 1700" class="relative flex">
      <ParticlesOne :render="true" />
      <ParticlesTwo :render="true" />
    </div>

    <div v-if="width > 1700 && width < 2000" class="relative flex">
      <ParticlesOne :render="true" />
      <ParticlesTwo :render="true" />
      <ParticlesOne />
    </div>

    <div v-if="width > 2000" class="relative flex">
      <ParticlesOne :render="true" />
      <ParticlesTwo :render="true" />
      <ParticlesOne :render="true" />
    </div>

    <div v-if="width > 500 && width < 810" class="relative flex">
      <ParticlesOne />
    </div>
    <div v-if="width < 810 && width > 600" class="relative flex">
      <ParticlesOne />
      <ParticlesTwo />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.--contain-- {
  opacity: 0;
  animation: contain 3s linear forwards;
  @keyframes contain {
    0% {
      opacity: 0;
    }
    70% {
      opacity: 0;
    }
    95% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>
