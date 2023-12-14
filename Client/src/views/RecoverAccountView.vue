<script setup>
import ClienteService from '../services/ClienteService';
import { useAccessStore } from '../stores/userStore';
import socket from "../lib/socket";
import { useRouter } from 'vue-router';
import FooterVue from "../components/Footer.vue";
const storeAccess = useAccessStore()
const router = useRouter()
const handleAccount = async (boolean) =>{
    const {data} = await ClienteService.findUserByEmail({email: storeAccess.user.email})
    const user = data[0]
   
   const response = await ClienteService.reviveUser(user._id)
    if (boolean) {// recuperar
        storeAccess.login(response.data);
      storeAccess.updateAdmin(response.data);
      socket.emit('new-user')
      router.push({ name: "home" });
      return
    } else {// crear
       const {data}= await ClienteService.updateUserById(user._id, storeAccess.user)
      
        storeAccess.login(data);
      storeAccess.updateAdmin(data);
      socket.emit('new-user')
      router.push({ name: "home" });
        return
    }
}

</script>

<template>
    <div class="text-title text-justify w-[60%] m-auto mt-44">
        I'm sorry, it seems that your account has been deleted. However, we want to help you recover it. Our technical support team will be happy to assist you in this process. If you wish to recover your account, please contact us for more information on how to do so. We are here to help you in any way we can.
        <div>
           <div class="flex justify-around">
            <button 
          class="bg-yellow-300 p-3 rounded-md text-black font-bold w-fit text-lg hover:bg-gray-800 hover:text-white"
          @click="handleAccount(false)"
        >
          Create Account
        </button>
        <button 
          class="bg-yellow-300 p-3 rounded-md text-black font-bold w-fit text-lg hover:bg-gray-800 hover:text-white"
          @click="handleAccount(true)"
        >
          Recover Account
        </button>
           </div>
        </div>
</div>
<FooterVue />
</template>

<style lang="scss" scoped>

</style>