<script setup>
import StarsComments from "../components/Clasificacion/StarsComments.vue";
import DetailGame from "../components/Clasificacion/DetailGame.vue";
import { useComments } from "../stores/gameStore";
import { onMounted, ref } from "vue";
import { useAccessStore } from "../stores/userStore";
import { useRouter } from "vue-router";
import FooterVue from "../components/Footer.vue";
const store = useAccessStore();
const router = useRouter();

onMounted(() => {
  if (!store.access) {
    router.push({ name: "login" });
    return;
  }
});

const storeComment = useComments();
// let averageFinal =( storeComment.comments?.reduce((total, comment) => {
//   return total + Number(comment.stars);
// }, 0) / storeComment.comments.length).toFixed(1)
// console.log(averageFinal);
</script>

<template>
  <div
    class="min-h-screen flex flex-col justify-center overflow-auto p-3"
    v-if="store.access"
  >
  <h1 class="text-title text-2xl mt-24 text-center font-bold">GAME DETAILS</h1>
    <div class="ppal">
      <DetailGame />
      <StarsComments class="comments" />
    </div>
  </div>
  <FooterVue />
</template>

<style lang="scss" scoped>
.ppal{
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  justify-content: space-around;
}

.comments{
  width: 50rem;
}
</style>
