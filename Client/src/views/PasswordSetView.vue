<script setup>
import { FormKit } from "@formkit/vue";
import BackgroundParticles from "../components/UI/BackgroundParticles.vue";
import ClienteService from "../services/ClienteService";
import {onMounted} from "vue";
import { useRouter, useRoute } from "vue-router";
import Authentication from "../components/Authentication.vue";
import welcome from "../assets/img/HenryMoon.svg";
import { useAccessStore } from "../stores/userStore";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import FooterVue from "../components/Footer.vue";
const store = useAccessStore();
import socket from "./../lib/socket";

const router = useRouter();

onMounted(async() => {
  const {data} = await ClienteService.searchByEmail({email: store.email})
})

const handleSubmit = async (dataForm) => {
    try {
        if(dataForm.password === dataForm.repeatPassword){
          await ClienteService.changePassword({email: store.email, password: dataForm.password })
          toast.success("Password changed successfully, Redirecting...", {
            autoClose: 3000,
          });
          function loginRedirect(){
            router.push({ name: "login" })
          }
          setTimeout(loginRedirect, 2000)
        }  else toast.warning("Passwords does not match", {
      autoClose: 3000,
    });
    }
   catch (error) {
    toast.warning("not sending", {
      autoClose: 3000,
    });
  }
}
;
</script>
<template>
    <div
    class="h-screen w-screen flex flex-col items-center justify-center overflow-hidden"
  >
    <BackgroundParticles />
    <h1 class="text-title text-2xl mb-5 font-bold">NEW PASSWORD</h1>
    <div
    class="--container--"
    >

    <FormKit
        type="form"
        :actions="false"
        incomplete-message="Make sure all fields are filled"
        form-class="w-[100%] grid"
        messages-class="text-red-500"
        @submit="handleSubmit"
      >
        <FormKit
          type="password"
          name="password"
          placeholder="Your new password"
          placeholder-class="input:focus:placeholder-transparent"
          validation="required"
          :validation-messages="{
            required: 'Password is required',
          }"
          validation-visibility="blur"
          input-class="pb-2 pl-2 mt-2 caret-yellow-400 bg-container border-b-2 border-white focus:outline-none w-[100%]  focus:placeholder-transparent"
          messages-class="text-red-500"
        />
        <FormKit
          outer-class="background"
          type="password"
          name="repeatPassword"
          placeholder="Repeat password"
          validation="required"
          :validation-messages="{
            required: 'Password is required',
          }"
          validation-visibility="blur"
          input-class="pb-2 pl-2 mt-7 caret-yellow-400 bg-container border-b-2 border-white focus:outline-none w-[100%] focus:placeholder-transparent"
          messages-class="text-red-500"
        />
        <input
          type="submit"
          class="text-black text-xl mt-9 rounded-md p-2 tracking-wider font-medium cursor-pointer justify-items-end"
          value="Ready 🚀"
        />
        <!-- <p v-if=""> {{  }}</p> -->
      </FormKit>
    </div>
  </div>
  <FooterVue />
</template>

<style lang="scss" scoped>
.--container-- {
 color: var(--title);
  background-color: var(--container);
  z-index: 10000;
  animation: container 2s linear forwards;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: solid 2px var(--border);
  border-radius: 15px;
  width: 50%;
  font-size: 20px;

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

input[type="button"] {
  background-color: var(--details);
  transition: 0.5s;
  border: solid 1px var(--details)
}

input[type="button"]:hover {
  background-color: var(--border);
  color: var(--container);
  border: solid 1px var(--title)
}

input[type="button"]:disabled {
  background-color: #d4bf0489;
  color: #00000087;
}
</style>
