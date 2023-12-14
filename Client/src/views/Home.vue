<script setup>
import { useAccessStore } from "../stores/userStore";
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import socket from "../lib/socket";
import Games from "../components/Games.vue";
import Sidebar from "../components/Sidebar.vue";
import MessageForm from "../components/MessageForm.vue";
import FooterVue from "../components/Footer.vue";
import Loading from "../components/UI/Loading.vue";
const store = useAccessStore()
const router = useRouter();
const usersOnline = ref(["-"]);
const usersOffline = ref(["-"]);
const gameRes = ref(false)
socket.emit("userData", store.user._id);
onMounted(() => {

  if (!store.access) {
    router.push({ name: "login" });
  }

  socket.emit("userData", store.user._id);

  socket.on("currentData", (users) => {
    usersOnline.value = users.filter(u => u.isConnected)
    usersOffline.value = users.filter(u => !u.isConnected)

  });  

});

onUnmounted(() => {
  socket.off("connect");
  socket.off("currentData");
  socket.off("disconnected");
});

const openTwilio = () => {
  const url = "http://localhost:5173/videocall";
  window.open(url, "_blank");
};

const handleGameRes = ()=>{
  gameRes.value = !gameRes.value
}


</script>
<template>
  <div v-if="store.access" class="min-h-screen flex flex-col m-auto justify-around overflow-hidden">

    <div class="ppal">
      <button @click="handleGameRes" class="boton">VideoCall and Games</button>
    
      <!-- ! Panel de conectados -->

      <!-- <div class="border border-gray-400 bg-gray-900 md:w-1/4 w-full flex flex-col m-2 p-2 text-white">
        <div class="flex flex-col m-2 p-2 flex-grow">
          <h1 class="text-white text-center text-2xl">GROUP {{ store.user.group }}</h1>
          <div class="border border-yellow-400 m-2 p-2 text-white h-1/2 overflow-auto">
            <h3 class="text-center font-bold ">ONLINE 🟢</h3>
            <p v-for="user_on in usersOnline" :key="user_on._id">{{ user_on.name }}</p>
          
          </div>
          <div class="border border-yellow-400 m-2 p-2 text-white h-1/2 overflow-auto">
            <h3 class="text-center font-bold ">OFFLINE ⚫</h3>
            <p v-for="user_off in usersOffline" :key="user_off._id">{{ user_off.name }}</p>
          </div>
        </div>
      </div> -->

      <!-- ! Sidebar chat -->

      <div :class=" gameRes ? 'boxppalRes' :'boxppal'">
        <div class="center-div text-2xl">
          <button
            class="videocall"
            @click="openTwilio">Start VideoCall <i class="fa-solid fa-video "></i></button>
        </div>

        <div class="boxgame">
          <h2 class="text">GAMES PANEL</h2>
          <div class="games">
            <Games />
          </div>
        </div>
        
      </div>
      <div class="box">
        <div class="boxinter">
          <div class="slide">
            <Sidebar />
          </div>
            <div class="boxchat">
              <MessageForm />
            </div>
        </div>

      </div>
    </div>
  </div>
  <FooterVue />
</template>


<style lang="scss" scoped>

.boxgame{
  width: 90%;
 display: flex;
 flex-direction: column;
 text-align: center;
}

.ppal{
  font-weight: bold;
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 30px;
}

.boxppal{
  margin: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--details);
  border-radius: 10px;
  color: white;
}

.text{
  font-size: 20px;

}

.box{
  border-radius: 10px;
}



.boxinter{
  position: relative;
}
.slide{
  border-radius: 10px;
}

.games{
  margin: 10px;
}

.videocall{
  margin: 10px;
  background-color: var(--details);
  width: 230px;
  height: 45px;
  color: #0f172a;
  border-radius: 10px;
}

.videocall:hover{
  background-color: #0f172a;
  border: 2px solid white;
  color: white;
}

@keyframes glow {
  from {
    box-shadow: 0px 0px 5px 5px #f5f5dc;
  }

  to {
    box-shadow: 0px 0px 10px 10px #f2e500;
  }
}

@keyframes glow {
  from {
    box-shadow: 0px 0px 5px 5px #f5f5dc;
  }

  to {
    box-shadow: 0px 0px 10px 10px #f2e500;
  }
}

.boton{
  display: none;
  background-color: var(--container);
  border: 2px solid var(--border);
  width: 350px;
  color: var(--title);
  border-radius: 10px;
  margin-top: 10px;
}

.boxppalRes{
  margin: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--details);
  border-radius: 10px;
  color: white;
}

@media (max-width: 680px) {
  .ppal{
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.boxppal{
  display: none;
}

.boxppalRes{
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--details);
  border-radius: 10px;
  color: white;
}

.boton{
  display: block;
}

}
</style>
