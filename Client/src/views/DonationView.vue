<script setup>
import { FormKit } from "@formkit/vue";
import { useAccessStore } from "../stores/userStore";
import { useLoaderStore } from "../stores/loaderStore";
import { onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import Donation from "../components/Donation.vue";
import ClienteService from "../services/ClienteService";
import FooterVue from "../components/Footer.vue";
const store = useAccessStore();
const router = useRouter();
const donations = ref([]);

const loader = useLoaderStore()

onMounted(async () => {
  if (!store.access) {
    router.push({ name: "login" });
    return
  }

  const { data } = await ClienteService.getAllDonations()
  donations.value = data.reverse();
  currentDonations.value = data;
  setPages();
});

const payPal = async (formData) => {
  const { name, email, _id } = store.user;
  const newName = name.split(' ').join('');
  const paymentInfo = {
    _id,
    name: newName,
    email,
    ...formData,
  };
  loader.setLoading(true)
  const response = await fetch("http://localhost:3001/payment/create-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(paymentInfo),
  });

  const data = await response.json();

  loader.setLoading(false)

  window.location.href = data.links[1].href;
};

// Aqui empieza la logica del Paginado
const currentDonations = ref([]);
const page = ref(1);
const donationsPerPage = 16;
const pages = ref([]);

watch(donations, () => {
  currentDonations.value = donations.value;
  setPages();
});

const displayedDonations = computed(() => {
  const from = (page.value - 1) * donationsPerPage;
  const to = page.value * donationsPerPage;
  return donations.value.slice(from, to)
})

const previusPage = () => {
  if (page.value > 1) {
    page.value--;
  }
}

const nextPage = () => {
  if (page.value < pages.value.length) {
    page.value++;
  }
}

const setPages = () => {
  pages.value = Array.from(
    { length: Math.ceil(donations.value.length / donationsPerPage) },
    (_, index) => index + 1);
}

</script>

<template>
  <div class="--container-- flex flex-col  items-center min-h-screen overflow-y-hidden"  v-if="store.access">
    <div class="flex flex-col text-title w-full items-center mt-32 ">
      <h1 class="title">Make your donation here!💰</h1>
      <div class="container">
        <FormKit 
          type="form" 
          form-class="container2" 
          incomplete-message="Please enter donation amount" 
          :actions="false"
          messages-class="text-red-600 text-lg flex justify-center" 
          @submit="payPal">
          <FormKit
            type="number" 
            name="donation" 
            placeholder="Enter Amount"
            input-class="bg-body text-lg p-2 m-2 border-2 rounded-[5px] border-border focus:outline-none focus:placeholder-transparent text-center placeholder-white"
            placeholder-class="text-red-500 input:focus:placeholder-transparent" 
            validation="required | number"
            :validation-messages="{
              required: 'Amount is required',
              number: 'Amount must be a number',
            }" 
            validation-visibility="blur" 
            messages-class="text-red-600 text-lg flex justify-center"
          />
          <input type="submit" value="Donate" class="botonDonate" />
        </FormKit>

        <div class="flex flex-wrap justify-center" >
          <Donation v-for="donation in displayedDonations" :donation="donation" :key="donation.id" :user="store?.user"/>
        </div>
        <div class="pag">
          <button 
            :class="['bt', { 'cursor-not-allowed': page === 1 }]"
            @click="previusPage" 
            :disabled="page === 1"
            >
            Prev
          </button>
          <button type="button" v-for="pageNumber in pages" @click="page = pageNumber" :key="pageNumber"
            :class="[page === pageNumber ? 'btsel' : 'btnum']">
            {{ pageNumber }}
          </button>
          <button v-if="pages.length > 1" type="button" @click="nextPage" :disabled="page === pages.length"
            :class="['bt', { 'cursor-not-allowed': page === pages.length }]">
            Next
          </button>
        </div>

    </div>
  </div>
  </div>
  <FooterVue />
</template>

<style lang="scss" scoped>
.--container-- {
  overflow-x: hidden;
}

@media (max-width: 768px) {
  .--container-- {
    position: relative;
    flex-direction: column;
    align-items: center;
  }
}
.title {
  color: var(--title);
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.container {
  height: auto;
  margin-top: 2rem;
  border-radius: 10px;
  margin-bottom: 3.5rem;
  width: 70%;
  border: solid 2px var(--details);
  background-color: var(--body);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem;
}

.container2 {
  background-color: var(--container);
  border: 1px solid var(--border);
  border-radius: 10px;
  width: 70%;
  margin: 0.5rem;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.botonDonate {
  background-color: var(--details);
  padding: 0.5rem;
  margin: 0.5rem;
  justify-content: center;
  border-radius: 0.375rem;
  cursor: pointer;
  color: black;
  font-weight: bold;
  width: 30%;
  font-size: 1.125rem;
  border: 1px solid var(--border);
  transition: 0.5s;
}

.botonDonate:hover {
  background-color: var(--border);
  color: var(--container);
  border: solid 1px var(--title);
}

.pag {
  /* flex flex-row w-full space-x-4 justify-center */
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin-top: 10px;
}

.bt {
  background-color: var(--details);
  width: 70px;
  border-radius: 7px;
  color: #0f172a;
  margin-left: 10px;
  margin-right: 10px;
}

.bt:hover {
  border: 2px solid white;
  background-color: #0f172a;
  color: white;
}

.btnum {
  background-color: var(--details);
  width: 40px;
  border-radius: 7px;
  color: #0f172a;
  margin-left: 10px;
  margin-right: 10px;
}

.btnum:hover {
  border: 2px solid white;
  background-color: #0f172a;
  color: white;
}

.btsel {
  background-color: var(--details);
  width: 40px;
  border-radius: 7px;
  margin-left: 10px;
  margin-right: 10px;
  border: 2px solid white;
  background-color: #0f172a;
  color: white;
}
@media screen and (max-width: 640px) {
  .container {
    padding: 1.5rem;
  }

  .botonDonate {
    width: 50%;
  }
}
</style>