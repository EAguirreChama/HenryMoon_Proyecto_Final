<script setup>

import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Loader from "./components/Loader.vue";
import { useRoute } from "vue-router";
import { useAccessStore } from "./stores/userStore";
import { useLoaderStore } from "./stores/loaderStore";

import { ref, provide } from 'vue' /* Para el nuevo chat */
import { watch } from "vue";

const store = useAccessStore();

const loader = useLoaderStore();

const route = useRoute();

/* ! ////////////// */

watch(loader, () => {
  console.log(loader.loading)
})

  // const SOCKET_URL = 'http://localhost:5001'
  // const socket = io(SOCKET_URL)

  const rooms = ref([])
  const currentRoom = ref('')
  const members = ref([])
  const messages = ref({})
  const privateMemberMsg = ref([])
  const newMessages = ref({})

  const setRooms = (rms) => {
    rooms.value = rms
  }
  const setCurrentRoom = (cr) => {
    currentRoom.value = cr
  }
  const setMembers = (mbs) => {
    members.value = mbs
  }
  const setMessages = (mgs) => {
    messages.value = mgs
  }
  const setPrivateMemberMsg = (pmm) => {
    privateMemberMsg.value = pmm
  }
  const setNewMessages = (nm) => {
    newMessages.value = nm
  }

  provide('chat-context', {
 
    // socket,
    rooms,
    setRooms,
    currentRoom,
    setCurrentRoom,
    members,
    setMembers,
    messages,
    setMessages,
    privateMemberMsg,
    setPrivateMemberMsg,
    newMessages,
    setNewMessages
  })

/* ! ////////////// */

const routesToNavBar = [
  "about",
  "profile",
  "home",
  "admin",
  "donation",
  "studentView",
  "game",
  "detailGame",
  "videocall"

];
/* 
const routes = [
  { path: '/', component: Home },
  // ... tus rutas existentes ...
  { path: '/:pathMatch(.*)', redirect: '/' }, // Ruta por defecto para rutas no encontradas
];
 */
</script>

<template>
  <Navbar
    v-if="
      routesToNavBar.includes(route.name) &&
      store.access &&
      route.name !== 'landing'
    "
  />

  <RouterView />

  <!-- RouterView nos permite ver las rutas de nuestro proyecto -->

  <div v-if="loader.loading" class="absolute top-0 right-0 left-0 bottom-0 flex justify-center items-center loader">
    <Loader v-if="loader.loading" />
  </div>
 
</template>

<style lang="scss">

.loader {
  z-index: 1000001;
  width: 100%;
  background-color: var(--body);
}

:root {
  --body: #020617;
  --container: #0f172a;
  --border: #64748b;
  --title: #e2e8f0;
  --details: #f2e600;
}

:root[data-theme="light"]{
  --body: #8b8b8b;
  --container:#e0e0e0;
  --border: #334155;
  --title: #0f172a;
  --details: #f2e600;
}



* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background-color: var(--body);
}
::-webkit-scrollbar {
  width: 8px;
  background-color: var(--border);
}

::-webkit-scrollbar-thumb {
  background-color: var(--details);
  border-radius: 5px;
}
</style>
