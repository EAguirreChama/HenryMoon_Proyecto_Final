<script setup>
import { FormKit } from "@formkit/vue";
import BackgroundParticles from "../components/UI/BackgroundParticles.vue";
import ClienteService from "../services/ClienteService";
import { useRouter, useRoute } from "vue-router";
import Authentication from "../components/Authentication.vue";
import welcome from "../assets/img/HenryMoon.svg";
import { useAccessStore } from "../stores/userStore";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const store = useAccessStore();
import socket from "./../lib/socket";
import { ref } from "vue";
import FooterVue from "../components/Footer.vue";
const router = useRouter();

function passCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters.charAt(randomIndex);
}

function passChain(length) {
    let chain = '';
    for (let i = 0; i < length; i++) {
        chain += passCode();
    }
    return chain;
}

const chainLength = 4;
const saveCode = ref("") //Acá se guarda el codigo

const email = ref("")

const handleCode = async ()=>{
  if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value) ){
      try{
        const randomChain = passChain(chainLength);
        saveCode.value = randomChain
        const {data} = await ClienteService.sendEmail({email: email.value, code: saveCode.value})
        store.email = email.value
        if(data.success){
          toast.success('email sent, please check your inbox', {
          autoClose: 3000,
        });
        }
      } catch(error){
        toast.warning(error.message, {
      autoClose: 3000,
    });
    }
  }
}

const handleSubmit = async (dataForm) => {
    try {
        dataForm.code === saveCode.value ? router.push({ name: "setNewPassword" }) : toast.warning("Code does not match, try again", {
      autoClose: 3000,
    });
  } catch (error) {
    toast.warning(error.message, {
      autoClose: 3000,
    });
  }
};
const redirectToLogin = () => {
  router.push({ name: "login" });
};
</script>
<template>
    <div
    class="h-screen w-screen flex flex-col items-center justify-center overflow-hidden"
  >
    <BackgroundParticles />
    <h1 class="text-title text-2xl mb-5 font-bold">RESET YOUR PASSWORD</h1>
    <div
    class="--container--"
    >

    <FormKit
        type="form"
        :actions="false"
        incomplete-message="Make sure all fields are filled"
        form-class="w-[100%] grid"
        messages-class="text-red-500 mt-2"
        @submit="handleSubmit"
      >
        <FormKit
          type="email"
          name="email"
          v-model="email"
          placeholder="Email to send confirmation"
          placeholder-class="input:focus:placeholder-transparent"
          validation="required | email"
          :validation-messages="{
            required: 'Email is required',
            email: 'Please enter a valid email address',
          }"
          validation-visibility="blur"
          input-class="pb-2 pl-2 mt-2 caret-yellow-400 bg-transparent border-b-2 border-white focus:outline-none w-[100%]  focus:placeholder-transparent"
          messages-class="text-red-500 mt-2"
        />
        <div class="flex flex-row justify-evenly mt-6">
          <button
            type="button"
            class="delete w-[15%] text-lg mt-2 p-2 bg-red-400 hover:bg-red-700 text-black text-center font-medium rounded-md"
            @click="redirectToLogin"
          >
            Cancel
          </button>
            <input
          type="button"
          class="text-black text-xl mt-2 rounded-md p-2 w-[70%] tracking-wider font-medium cursor-pointer"
          value="Send email"
         @click="handleCode"
        />
        </div>
        <FormKit
          outer-class="background"
          type="text"
          name="code"
          placeholder="Enter code"
          validation="required"
          :validation-messages="{
            required: 'Code is required',
          }"
          validation-visibility="blur"
          input-class="pb-2 pl-2 mt-7 caret-yellow-400 bg-transparent border-b-2 border-white focus:outline-none w-[100%] focus:placeholder-transparent"
          messages-class="text-red-500 mt-2"
        />
        <input
          type="submit"
          class="text-black text-xl mt-9 rounded-md p-2 tracking-wider font-medium cursor-pointer"
          value="Check code ⌨️"
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
  border: solid 1px var(--title);
}

input[type="button"]:disabled {
  background-color: #d4bf0489;
  color: #00000087;
}
.delete{
  transition: 0.5s;
  border: solid 1px var(--border);
}
.delete:hover {
 background-color: var(--border);
  color: var(--container);
  border: solid 1px var(--title);
}
</style>
