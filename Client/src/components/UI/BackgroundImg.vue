<script setup>
import moon from '../../assets/img/moon.svg';
import traje from '../../assets/img/traje.svg';
import cohete from '../../assets/img/cohete.svg';
import none from '../../assets/img/none.svg'
import { onMounted, ref } from 'vue';

const images = [
  { src: moon, alt: 'Imagen 1' },
  { src: none, alt: '' },
  { src: cohete, alt: 'Imagen 3' },
  { src: none, alt: '' },
  { src: traje, alt: 'Imagen 2' },
  { src: none, alt: '' },
  { src: moon, alt: 'Imagen 1' },
  { src: none, alt: '' },
  { src: none, alt: '' },
  { src: cohete, alt: 'Imagen 3' },
  { src: none, alt: '' },
  { src: traje, alt: 'Imagen 2' },
  { src: none, alt: '' },
  { src: moon, alt: 'Imagen 3' },
  { src: none, alt: '' },
  { src: cohete, alt: 'Imagen 2' },
  { src: none, alt: '' },
  { src: none, alt: '' },
  { src: traje, alt: 'Imagen 3' },
  { src: none, alt: '' },
  { src: moon, alt: 'Imagen 1' },
  { src: none, alt: '' },
  { src: cohete, alt: 'Imagen 2' },
  { src: none, alt: '' },
  { src: traje, alt: 'Imagen 3' },
  { src: none, alt: '' },
  { src: none, alt: '' },
  { src: moon, alt: 'Imagen 1' },
  { src: none, alt: '' },
  { src: cohete, alt: 'Imagen 3' },
  { src: none, alt: '' },
  { src: traje, alt: 'Imagen 3' },
  { src: none, alt: '' },
  { src: moon, alt: 'Imagen 2' },
  { src: none, alt: '' },
  { src: none, alt: '' },
  { src: cohete, alt: 'Imagen 1' },
  { src: none, alt: '' },
  { src: traje, alt: 'Imagen 3' },
  { src: none, alt: '' },
  { src: moon, alt: 'Imagen 2' },
  { src: none, alt: '' },
  { src: cohete, alt: 'Imagen 3' },
  { src: none, alt: '' },
  { src: traje, alt: 'Imagen 2' },
  { src: none, alt: '' },
  { src: moon, alt: 'Imagen 2' },
  { src: none, alt: '' },
  { src: none, alt: '' },
  { src: cohete, alt: 'Imagen 2' },
  { src: none, alt: '' },
  { src: traje, alt: 'Imagen 1' },
  { src: none, alt: '' },
  { src: moon, alt: 'Imagen 3' },
  { src: none, alt: '' },
  { src: cohete, alt: 'Imagen 1' },
  { src: none, alt: '' },
  { src: none, alt: '' },
  { src: traje, alt: 'Imagen 3' },
  { src: none, alt: '' },
  { src: moon, alt: 'Imagen 1' },
  { src: none, alt: '' },
  { src: cohete, alt: 'Imagen 3' },
  { src: none, alt: '' },
  { src: traje, alt: 'Imagen 3' },
  { src: none, alt: '' },
  { src: none, alt: '' },
  { src: moon, alt: 'Imagen 3' },
  { src: none, alt: '' },
  { src: cohete, alt: 'Imagen 3' },
  { src: none, alt: '' },
  { src: traje, alt: 'Imagen 2' },
  { src: none, alt: '' },
  { src: moon, alt: 'Imagen 3' },
  { src: none, alt: '' },
  { src: none, alt: '' },
  { src: cohete, alt: 'Imagen 1' },
  { src: none, alt: '' },
  { src: traje, alt: 'Imagen 3' },
  { src: none, alt: '' },
  { src: moon, alt: 'Imagen 1' },
  { src:  none, alt: '' },
  { src: cohete, alt: 'Imagen 2' },
  { src: none, alt: '' },
  { src: none, alt: '' },
  { src: traje, alt: 'Imagen 1' },
  { src: traje, alt: 'Imagen 2' },
  { src: cohete, alt: 'Imagen 3' },
  { src: moon, alt: 'Imagen 1' },
  { src: traje, alt: 'Imagen 2' },
  { src: cohete, alt: 'Imagen 3' },
  { src: traje, alt: 'Imagen 2' },
  { src: moon, alt: 'Imagen 1' },
  { src: traje, alt: 'Imagen 2' },
  // Agrega aquí las imágenes restantes
];
const imageContainer = ref(null);
function addImages() {
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const img = document.createElement('img');
      img.src = image.src;
      imageContainer.value.appendChild(img);
    }
}

function getRandomPosition() {
  const x = Math.floor(Math.random() * 100);
  const y = Math.floor(Math.random() * 100);
  return { x, y };
}

onMounted(() => {
  addImages();

  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    
  }
});
</script>

<template>
  <div class="background">
    <div class="imageContainer">
      <img v-for="image in images" :key="image.src" :src="image.src" :alt="image.alt" />
    </div>
  </div>
</template>


<style lang="scss" scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}


.imageContainer {
  opacity: 8%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around; /* Añadido para centrar las imágenes horizontalmente */
}

.imageContainer img {
  margin: 2px;
  width: 200px;
  height: 200px;
  animation: rotateImage 70s linear infinite;
}

@keyframes rotateImage {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(60deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>