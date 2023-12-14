<script setup>
import { useRouter, useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import ClienteService from "../services/ClienteService";
import { useAccessStore } from "../stores/userStore";
import FooterVue from "../components/Footer.vue";
const store = useAccessStore();
const counter = ref(7)
const router = useRouter()
const route = useRoute()

const id = route.params.id

onMounted(async () => {
    if(id !== store.user._id || !store.access) {
        router.push({name: 'login'})
        return
    }
    store.logOut();
})

const handleRouter = ()=> {
    router.push({name: 'landing'})
}

if (counter.value >= 1) {
    setInterval(()=>{
        counter.value--
    }, 1000);
}
</script>

<template>
    <div class="text-white w-[60%] m-auto mt-44">
        Sorry, it seems like your account has been deleted. Would you like to recover it? Our technical support team will be happy to assist you in this process. Please contact us for more information on how to recover your account.
        <div>
            <div v-if="counter >= 0">you can go landing in {{ counter }} sec.</div>
            <button v-else
          class="bg-yellow-300 p-3 rounded-md text-black font-bold w-fit text-lg hover:bg-gray-800 hover:text-white"
          @click="handleRouter"
        >
          Landing
        </button>
        </div>
</div>
<FooterVue />
</template>

<style lang="scss" scoped>

</style>