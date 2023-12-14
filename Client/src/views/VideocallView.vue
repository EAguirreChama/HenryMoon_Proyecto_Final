<script setup>
import { onMounted } from 'vue';
import { useAccessStore } from "../stores/userStore";
import Videocall from '../components/Videocall.vue';
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
    <Videocall class="vcall"/>
  </div>
  <FooterVue />
</template>



<style lang="scss" scoped>
.boxppal{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.vcall{
  margin-top: 100px;
  width: 100%;
  height: 100%;
}

</style>
