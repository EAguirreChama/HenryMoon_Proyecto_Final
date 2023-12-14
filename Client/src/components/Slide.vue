<script setup>
import image from "../assets/img/slides/1.svg";
import image1 from "../assets/img/slides/2.svg";
import image2 from "../assets/img/slides/3.svg";
import image3 from "../assets/img/slides/4.svg";
import image4 from "../assets/img/slides/5.svg";
import image5 from "../assets/img/slides/6.svg";
import image6 from "../assets/img/slides/7.svg";
import image7 from "../assets/img/slides/8.svg";
import image8 from "../assets/img/slides/9.svg";
</script>

<template>
  <div class="slide ">
    <img class="absolute flex z-99 animate-1" :src="image" />
    <img class="absolute flex z-98 animate-2" :src="image1" />
    <img class="absolute flex z-97 animate-3" :src="image2" />
    <img class="absolute flex z-96 animate-4" :src="image3" />
    <img class="absolute flex z-95 animate-5" :src="image4" />
    <img class="absolute flex z-94 animate-6" :src="image5" />
    <img class="absolute flex z-93 animate-7" :src="image6" />
    <img class="absolute flex z-92 animate-8" :src="image7" />
    <img class="absolute animate-9 flex z-91" :src="image8" />
  </div>
</template>

<style lang="scss" scoped>
.slide {
  position: relative;
  z-index: 1;
  max-height: 100%;
}

.slide img {
  display: block;
}

.animate-9 {
  animation: animate-9 30s linear infinite;

  @keyframes animate-9 {
    0% {
      opacity: 0;
    }
    2% {
      opacity: 1;
    }
    9% {
      opacity: 1;
    }
    11% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
}

.animate-8 {
  animation: animate-8 30s linear infinite;

  @keyframes animate-8 {
    0% {
      opacity: 0;
    }
    9% {
      opacity: 0;
    }
    11% {
      opacity: 1;
    }
    20% {
      opacity: 1;
    }
    22% {
      opacity: 0;
    }
    99% {
      opacity: 0;
    }
    100%{
      opacity: 0;
    }
  }
}

.animate-7 {
  animation: animate-7 30s linear infinite;

  @keyframes animate-7 {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 0;
    }
    22% {
      opacity: 1;
    }
    31% {
      opacity: 1;
    }
    33% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
}

.animate-6 {
  animation: animate-6 30s linear infinite;

  @keyframes animate-6 {
    0% {
      opacity: 0;
    }
    31% {
      opacity: 0;
    }
    33% {
      opacity: 1;
    }
    42% {
      opacity: 1;
    }
    44% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
}

.animate-5 {
  animation: animate-5 30s linear infinite;

  @keyframes animate-5 {
    0% {
      opacity: 0;
    }
    41% {
      opacity: 0;
    }
    44% {
      opacity: 1;
    }
    53% {
      opacity: 1;
    }
    55% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
}

.animate-4 {
  animation: animate-4 30s linear infinite;

  @keyframes animate-4 {
    0% {
      opacity: 0;
    }
    53% {
      opacity: 0;
    }
    55% {
      opacity: 1;
    }
    64% {
      opacity: 1;
    }
    66% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
}

.animate-3 {
  animation: animate-3 30s linear infinite;

  @keyframes animate-3 {
    0% {
      opacity: 0;
    }
    64% {
      opacity: 0;
    }
    66% {
      opacity: 1;
    }
    75% {
      opacity: 1;
    }
    77% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
}

.animate-2 {
  animation: animate-2 30s linear infinite;

  @keyframes animate-2 {
    0% {
      opacity: 0;
    }
    75% {
      opacity: 0;
    }
    77% {
      opacity: 1;
    }
    86% {
      opacity: 1;
    }
    88% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
}

.animate-1 {
  animation: animate-1 30s linear infinite;
opacity: 0;
  @keyframes animate-1 {
    0% {
      opacity: 0;
    }
    86% {
      opacity: 0;
    }
    88% {
      opacity: 1;
    }
    96% {
      opacity: 1;
    }
    99% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
}
</style>
