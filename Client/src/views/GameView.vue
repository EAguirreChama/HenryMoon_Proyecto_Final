<script setup>

import { onMounted } from 'vue';
import { useAccessStore } from "../stores/userStore";
import Game from '../components/Game.vue';
import MessageForm from "../components/MessageForm.vue";
import Sidebar from '../components/Sidebar.vue';
import { useRouter } from 'vue-router';
import FooterVue from "../components/Footer.vue";
const router = useRouter();
const store = useAccessStore()

onMounted(() => {
  if (!store.access) {
    router.push({ name: "login" });
    return
  }
})

</script>

<template>
  <div class="boxppal" v-if="store.access">
    <div class="ppal">
      <div class="game">
        <Game/>
      </div>
      <div class="boxes">
        <div class="grow">
          <Sidebar/>
        </div>
        <div class="boxinter">
          <div class="boxchat">
            <MessageForm/>
          </div>
        </div>
      </div>  
    </div>
  </div>
  <FooterVue />

</template>



<style lang="scss" scoped>

.ppal{
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 100px;
}
.boxppal{
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.boxinter{
  position: relative;
}

.game{
  scale: 1;
}

.boxchat{

  width: 350px;
  overflow: auto;
}

.boxes{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  width: 360px;
}

</style>
