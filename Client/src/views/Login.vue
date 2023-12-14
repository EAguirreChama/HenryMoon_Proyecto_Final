<script setup>
import { FormKit } from "@formkit/vue";
import BackgroundParticles from "../components/UI/BackgroundParticles.vue";
import ClienteService from "../services/ClienteService";
import { useRouter, useRoute } from "vue-router";
import Authentication from "../components/Authentication.vue";
import welcome from "../assets/img/HenryMoon.svg";
import { useAccessStore } from "../stores/userStore";
import { useLoaderStore } from "../stores/loaderStore";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const store = useAccessStore();
import socket from "./../lib/socket";
import { onMounted } from "vue";

import { ref } from "vue";
const router = useRouter();

onMounted(() => {
  if(store.user && store.access) {
    router.push({name: 'home'})
  } 
})

const loader = useLoaderStore()

const loading = ref(false)

const changeLoading = (value) => {
  loading.value = value
}

const handleSubmit = async (dataForm) => {
  try {
    loader.setLoading(true)
    const { data } = await ClienteService.login(dataForm);
    if(data.user === null) {
      loading.value = false
      toast.warning("this account don't exist", {
        autoClose: 3000,
      })
      return
    }
    if(data.user.isBanned) {
      loader.setLoading(false)
      return router.push({name: 'banned'})      
    }
    if (data.access) {
      store.login(data.user);
      store.updateAdmin(dataForm);
      socket.emit('new-user')
      loader.setLoading(false)
      router.push({ name: "home" });
      return
    } else {
      loader.setLoading(false)
      toast.warning('This account has been deleted', {
      autoClose: 3000,
    });

    } 
    loading.value = false
    return
  } catch (error) {
    loader.setLoading(false)
    toast.warning('Wrong email or password', {
      autoClose: 3000,
    });
    return
  }
};

</script>
<template>
  <div
    v-if="!store.access"
    class="h-screen w-screen flex items-center justify-center overflow-hidden"
  >
    <BackgroundParticles />
    <div
      class="--container--"
    >
      <img :src="welcome" alt="" class="h-36" />
      <FormKit
        type="form"
        :actions="false"
        incomplete-message="Make sure all fields are filled"
        form-class="w-[100%] grid"
        messages-class="text-red-500"
        @submit="handleSubmit"
      >
        <FormKit
          type="email"
          name="email"
          placeholder="Email"
          placeholder-class="input:focus:placeholder-transparent"
          validation="required | email"
          :validation-messages="{
            required: 'Email is required',
            email: 'Please enter a valid email address',
          }"
          validation-visibility="blur"
          input-class="pb-2 pl-2 mt-2 caret-yellow-400 bg-transparent border-b-2 border-white focus:outline-none w-[100%]  focus:placeholder-transparent"
          messages-class="text-red-500"
        />
        <FormKit
          outer-class="background"
          type="password"
          name="password"
          placeholder="Password"
          validation="required"
          :validation-messages="{
            required: 'Password is required',
          }"
          validation-visibility="blur"
          input-class="pb-2 pl-2 mt-7 caret-yellow-400 bg-transparent border-b-2 border-white focus:outline-none w-[100%] focus:placeholder-transparent"
          messages-class="text-red-500"
        />
        <input
          type="submit"
          class="text-black text-xl mt-9 rounded-md p-2 tracking-wider font-medium cursor-pointer justify-items-center"
          value="Login"
        />
      </FormKit>

      <span class="mt-4"
        >Do not you have an account yet?
        <RouterLink :to="{ name: 'register' }"
          ><span class="link"
            >Sign up here</span
          ></RouterLink
        >
      </span>

      <span class="mt-4">
        <RouterLink :to="{ name: 'sendCode' }"
          ><span class="link"
            >Did you forget your password?</span
          ></RouterLink
        >
      </span>
      <span class="mt-4">or Login with </span>
      <Authentication @change-loading="changeLoading"/>
    </div>
  </div>

  <!-- <div v-if="loading" class="text-white absolute top-0 right-0 left-0 bottom-0 flex justify-center items-center loader">
    <p class="text-9xl">Loading...</p>
  </div> -->
</template>

<style lang="scss" scoped>
.loader {
  background-color: hsl(0 0% 0% / .9);
  z-index: 10001;
}

.--container-- {
  color: var(--title);
  background-color: var(--container);
  z-index: 10000;
  animation: container 2s linear forwards;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border: solid 2px var(--border);
  border-radius: 15px;
  width: 40%;
  font-size: 18px;
  

  @keyframes container {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}

@media (max-width: 900px) {
  .--container-- {
    width: 60%;
  }
}
@media (max-width: 500px) {
  .--container-- {
    width: 90%;
  }
}

input[type="submit"] {
  background-color: var(--details);
  transition: 0.5s;
  border: solid 1px var(--border);
}

input[type="submit"]:hover {
  background-color: var(--border);
  color: var(--container);
  border: solid 1px var(--title);
}

input[type="submit"]:disabled {
  background-color: #d4bf0489;
  color: #00000087;
}
.link{
  text-decoration: underline;
  font-size: 18px;
  color: var(--details);
}
.link:hover{
  color: var(--title);
}
</style>
