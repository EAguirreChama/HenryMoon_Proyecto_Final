<script setup>
import { ref } from "vue";
import ButtonLanding from "../components/Buttons/ButtonLanding.vue";
import HenryMoonWelcome from "../components/UI/HenryMoonWelcome.vue";
import Slide from "../components/Slide.vue";
import BackgroundParticles from "../components/UI/BackgroundParticles.vue";
// import lets_go from "../assets/UI/sounds_effects/let's_go.mp3";
import FooterVue from "../components/Footer.vue";
const giveClass = ref(false);
const updateClass = () => {
  setTimeout(() => {
    giveClass.value = true;
  }, 3200);
};
updateClass();
</script>

<!-- Este componente pertence al landing y en él se renderiza una imagen de bienvenida que desaparece a los 3 segundos, un background de partículas, un slide y un botón para ingresar al inicio de sesión o registro. -->

<template>
  <div
    class="bg-black overflow-hidden h-screen flex justify-center items-center text-white"
  >
    <!-- Acá renderizamos la imagen de bienvenida. -->
    <HenryMoonWelcome />

    <!-- Definimos un div que contenga el background de parículas y un div que contenga las slides y el RouterLink con el botón. -->
    <div class="animation flex text-center items-center justify-center mx-auto">
      <BackgroundParticles />
      <div class="flex-row items-center relative bottom-9">
        <Slide />

        <RouterLink :to="{ name: 'login' }"
          ><ButtonLanding :class="giveClass ? 'focus' : 'notFocus'"
            >Let's Go!</ButtonLanding
          ></RouterLink
        >
      </div>
    </div>
  </div>
  <FooterVue />

</template>

<style lang="scss" scoped>
// Definir la animación
.animation {
  animation: animation 2.3s linear forwards;
  @keyframes animation {
    0% {
      opacity: 0;
    }
    95% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}
.notFocus {
  position: relative;
}
.focus {
  animation: focus 2s linear infinite;
  position: relative;
  @keyframes focus {
    10% {
      transform: scale(0.95);
    }
    15% {
      transform: scale(1);
    }
    100% {
      transform: scale(1);
    }
  }
}
</style>