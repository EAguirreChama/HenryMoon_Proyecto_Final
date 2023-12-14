<script setup>
import { useAccessStore } from "../stores/userStore";
import { useLoaderStore } from "../stores/loaderStore";
import { ref } from "vue";
import { useRouter } from "vue-router";
import CloudImage from "../components/CloudImage.vue";
import clientServices from "./../services/ClienteService"
import icondark from '../assets/img/icondark.svg'
import icon from '../assets/img/icon.svg'
import { onUnmounted } from "vue";
const store = useAccessStore();
const router = useRouter();
const checkImage = store.user.image?.split('/').length
const menuOpen = ref(false);
const lightMode = ref(true)
const confirm = ref(false)

const loader = useLoaderStore()

const setTheme = (mode)=>{
  document.documentElement.setAttribute('data-theme', mode)
} 
const handleMode = ()=>{
  if(lightMode.value){
    setTheme("light")
    lightMode.value = false
  }else{
    setTheme("dark")
    lightMode.value = true
  }
}
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};



const handleLogOut = async () => {
  loader.setLoading(true)
  await clientServices.logout(store.user)
  store.logOut();
  loader.setLoading(false)
  router.push({ name: "landing" });
};

const handleConfirm = ()=>{
  if(confirm.value){
    confirm.value = false
  }else{
    confirm.value = true
  }
}

onUnmounted(()=>{
  setTheme("dark")
})
const isButtonActive = (routeName) => {
  return router.currentRoute.value.name === routeName;
};
</script>

<template>
  <nav class="nav">
    <div class="max-w-screen-xl mx-auto p-3 flex items-center justify-between">
      <div class="">
        <router-link
          :to="{ name: 'home' }"
        ><img :src=" lightMode ? icon : icondark" alt="HenryMoon Logo" class="icon" /></router-link>
      </div>
      <ul
        :class="menuOpen ? 'lista' : 'hidden'"
        class="md:flex md:flex-row md:w-auto md:items-center md:space-y-0 md:space-x-4 items-center text-center space-y-2 text-white text-xl flex flex-col justify-center"
      >
        <li class="flex items-center" v-if="store.admin">
          <router-link
            @click ="toggleMenu"
            :to="{ name: 'admin' }"
            :class="lightMode ?  'text' : 'textL'"
            > Admin Dash <i class="fa-solid fa-screwdriver-wrench"></i></router-link
          >
        </li>
        <li class="flex items-center">
          <router-link
            @click ="toggleMenu"
            :to="{ name: 'profile' }"
            :class="lightMode ?  'text' : 'textL'"
          >
          <img :src="store.user.image" 
            alt="" 
            v-if="checkImage >2"               
            class="w-16 h-16 border border-details rounded-full object-cover "
            >
            <CloudImage
              :image-name="store.user.image"
              :key="store.user.image"
              v-else
              class="w-16 h-16 border border-details rounded-full object-cover "
          /></router-link>
        </li>
        <li >
          <button :class="[{'active': isButtonActive('home')}, lightMode ? 'text' : 'textL']">
            <router-link
              @click ="toggleMenu"
              :to="{ name: 'home' }"
              :class="lightMode ? 'text' : 'textL'"
            >
            Home <i class="fa-solid fa-house"></i></router-link>
          </button>
        </li>
        <li >
          <button :class="[{'active': isButtonActive('about')}, lightMode ?  'text' : 'textL']">
            <router-link
              @click ="toggleMenu"
              :to="{ name: 'about' }"
              :class="lightMode ?  'text' : 'textL'"
              >About <i class="fa-solid fa-address-card"></i></router-link>
          </button>
        </li>
        <li >
          <button :class="[{'active': isButtonActive('donation')}, lightMode ?  'text' : 'textL']">
            <router-link
              @click ="toggleMenu"
              :to="{ name: 'donation' }"
              >Donation <i class="fa-solid fa-circle-dollar-to-slot"></i></router-link
            >
          </button>
        </li>
        <li >
          <button
            @click="handleConfirm"
            :class="lightMode ?  'log' : 'logL'"
          >
            Log Out <i class="fa-solid fa-right-from-bracket"></i>
          </button>
        </li>
        <li>
          <div class="mode">
            <button @click="handleMode" ><i :class= "lightMode ? 'fa-solid fa-sun fa-xl':'fa-solid fa-moon fa-xl'" :style="lightMode ? 'color: #e2e8f0':'color: #111827' " ></i></button>
          </div>
        </li>
      </ul>
      <button
        @click="toggleMenu"
        type="button"
        class="md:hidden text-white hover:text-yellow-300 cursor-pointer"
      >
      <i :class="menuOpen ?'fa-solid fa-xmark fa-2xl':'fa-solid fa-bars fa-2xl'" ></i>
      </button>
    </div>
  </nav>
  <div v-if="confirm">
    <div  :class="menuOpen? 'confirmRes' :'confirm'">
      You're sure ?
      <div>
        <button  class="bt" @click="handleLogOut">Yes <i class="fa-solid fa-check"></i></button>
        <button class="bt" @click="handleConfirm">Cancel <i class="fa-solid fa-xmark"></i></button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.loader {
  background-color: hsl(0 0% 0% / .6);
  z-index: 10001;
}

.--container-- {
  z-index: 10000;
}

.nav{
  z-index: 10000;
  background-color: var(--container) ;
  position: fixed;
  width: 100%;
  margin: auto;
}
.mode{
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 25px;
  width: 50px;
  height: 50px;
}

.active {
  border-bottom: solid 2px gold;
}

.bt{
  width: 80px;
  height: 30px;
}

.bt:hover{
  border-radius: 5px;
  color: white;
  background-color: #0f172a;
  scale: 1.1;
}

.text{
  color: var(--title);
}

.text:hover{
  scale: 1.1;
  color: var(--details);
}


.confirm{
  font-weight: bold;
  z-index: 10000000;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  height: 70px;
  width: 200px;
  position: absolute;
  top: 70px;
  right: 250px;
  background-color: var(--details);
  color: #0f172a;
}

.confirmRes{
  font-weight: bold;
  z-index: 10000000;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  height: 70px;
  width: 200px;
  position: absolute;
  top: 38%;
  right: 50px;
  background-color: var(--details);
  color: #0f172a;
}

.textL{
  color: var(--title);
}

.log{
  color: var(--title);
}

.log:hover{
  scale: 1.1;
  color: red;
}

.logL{
  color: var(--title);
}

.logL:hover{
  scale: 1.1;
  color: red;
}
.textL:hover{
  scale: 1.1;
  color: var(--body);
}

.icon{
  height: 40px;
}

@media (max-width: 780px) {
  .lista{
  z-index: 1000000;
  padding-top: 30px;
  padding-bottom: 20px;
  position: absolute;
  right: 0;
  top: 60px;
  width: 300px;
  background-color: var(--container);
  border-radius: 0 0 0 25px;
  border: 3px solid var(--border);
}
}
</style>
