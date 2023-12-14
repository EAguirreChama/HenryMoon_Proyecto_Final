<script setup>
import { FormKit } from "@formkit/vue";
import { loadRouteLocation, useRouter } from "vue-router";
import ClienteService from "../services/ClienteService";
import BackgroundParticles from "../components/UI/BackgroundParticles.vue";
import { useAccessStore } from "../stores/userStore";
import { useLoaderStore } from "../stores/loaderStore";
import CloudImage from "../components/CloudImage.vue";
import { ref } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const store = useAccessStore();
const router = useRouter();
const countries = ref([])
import socket from "./../lib/socket";
import { onMounted } from "vue";
import Helpers from "../helpers";

const widget = window.cloudinary.createUploadWidget(
  { cloud_name: "HenryMoon", upload_preset: "sm7kib26" },
  (error, result) => {
    if (!error && result && result.event === "success") {
      uploadedImage.value = result.info.public_id;
    }
  }
);

function openUploadWidget() {
  widget.open();
}

let uploadedImage = ref("Users/nx0xistql7jbamjxca5u");

const loader = useLoaderStore()

const handleSubmit = async (dataForm) => {
  // ANTES QUE NADA DEBEMOS REALIZAR LA CONSULTA
  dataForm.image = uploadedImage.value;
  const create = ref(false);
  loader.setLoading(true)
  await ClienteService.findUserByEmail({ email: dataForm.email })
    .then(async ({ data }) => {
      if(data.length) {
        if (data[0].isBanned) {
          loader.setLoading(false)
          router.push({ name: "banned" });
          return;
        } else if (data[0].isDeleted) {

          store.updateProfile(dataForm)
          loader.setLoading(false)          

          router.push({ name: "recover" });
          return;
        } else if(!data[0].isBanned && !data[0].isDeleted){
          loader.setLoading(false)
          toast.warning("That user already exists", {
            autoClose: 3000,
          });
        }
      } else {
        create.value = true;
      }
    })
    .then(async () => {
      if (create.value) {
        try {
          loader.setLoading(true)
          const { data } = await ClienteService.register(dataForm);
          if (data.access) {
            store.login(data.user);
            store.updateAdmin(dataForm);
            socket.emit("new-user");
            loader.setLoading(false)
            router.push({ name: "home" });
          }
        } catch (error) {
          loader.setLoading(false)
          toast.warning("Wrong, sorry!", {
            autoClose: 3000,
          });
        }
      }
    });
    loader.value = false
};

const cohorts = ref([])

onMounted(async ()=> {
  const response = await ClienteService.getAllCohorts()
  cohorts.value = [...response.data]
  
  const {data: countriesData} = await ClienteService.getAllCountries()
  countries.value = [...Helpers.beautifyCountries(countriesData)]
})

const validate_Cohort_Group = (cohort,group) => {

  return (cohort !== '---' && group !== '---')

  /* const expReg = /^\d{2}[a-zA-Z]$/;

  if(!expReg.test(cohort.value)) {
    validationError.value = true;
    validationErrorMessage.value = 'Formato de cohorte inválido. Por favor, ingresa 2 números seguidos de una letra.'
  } else {
    validationError.value = false;
    validationErrorMessage.value = '';
  } */
}

const groups = ref([])
const select_cohortReady= ref(false)

const findGroup = async (e) => {
  select_cohortReady.value = true
  if(e.target.value !== '---') {
    const {data} = await ClienteService.getAllGroups(e.target.value)
    if(groups.value.length <= 1) {
      groups.value = [...data]
    } else {
      groups.value = [...data]
    }

  }
}

const select_cohort = (value) => {
  return value !== '---'
}

const select_group = (value) => {
  return value !== '---'
}
const redirectToLogin = () => {
  router.push({ name: "login" });
};
</script>
<template>
  <div
    class="overflow-x-hidden min-h-screen  flex flex-col items-center justify-center"
  >
    <BackgroundParticles />
    <h1 class="text-title text-2xl mb-5 font-bold">REGISTER</h1>
    <div class="--container--">
      <FormKit
        type="form"
        :actions="false"
        incomplete-message="Make sure all fields are filled"
        form-class="w-full grid"
        messages-class="text-red-600"
        @submit="handleSubmit"
      >
        <FormKit
          type="text"
          name="name"
          placeholder="Name"
          placeholder-class="input:focus:placeholder-transparent"
          validation="required"
          :validation-messages="{
            required: 'Name is required',
          }"
          validation-visibility="blur"
          input-class="pb-2 mt-7 caret-yellow-400 bg-transparent border-b-2 border-white focus:outline-none w-[100%] focus:placeholder-transparent"
          messages-class="text-red-600"
        />

        <FormKit
          type="text"
          name="lastName"
          placeholder="Last Name"
          placeholder-class="input:focus:placeholder-transparent"
          validation="required"
          :validation-messages="{
            required: 'Last Name is required',
          }"
          validation-visibility="blur"
          input-class="pb-2 mt-7 caret-yellow-400 bg-transparent border-b-2 border-white focus:outline-none w-[100%] focus:placeholder-transparent"
          messages-class="text-red-600"
        />

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
          input-class="pb-2 mt-7 caret-yellow-400 bg-transparent border-b-2 border-white focus:outline-none w-[100%] focus:placeholder-transparent"
          messages-class="text-red-600"
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
          input-class="pb-2 mt-7 caret-yellow-400 bg-transparent border-b-2 border-white focus:outline-none w-[100%] focus:placeholder-transparent"
          messages-class="text-red-600"
        />
        <div class=" mt-2 flex flex-row justify-between items-center">
          <div class=" w-[45%] text-center">
            <FormKit
          type="select"
          name="country"
          class="country"
          :options="countries"
          placeholder="Country"
          placeholder-class="input:focus:placeholder-transparent"
          validation="required"
          :validation-messages="{
            required: 'Country is required',
          }"
          validation-visibility="blur"
          input-class="pb-2 mt-5  bg-container border-b-2 border-white focus:outline-none w-[100%] focus:placeholder-transparent"
          messages-class="text-red-600"
        />
          </div>
          <div class=" w-[45%] text-center">
            <FormKit
          type="date"
          name="birthdate"
          placeholder="Birthdate"
          placeholder-class="input:focus:placeholder-transparent"
          validation="required"
          :validation-messages="{
            required: 'Birthdate is required',
          }"
          validation-visibility="blur"
          input-class="pb-2 mt-5 bg-container border-b-2 border-white focus:outline-none w-[100%] focus:placeholder-transparent"
          messages-class="text-red-600"
        >
        <i class="calendar-icon fa-regular fa-calendar fa-sm text-red-500"></i>
        </FormKit>
          </div>
        </div>    
        

        <!-- ! /////////////////////// -->

        <div class="mt-2 flex flex-row justify-around items-center">
          <div>
            <FormKit
              type="select"
              name="cohort"
              label="Cohort :"
              placeholder="Cohort"
              validation="required"
              validation-visibility="blur"
              :validation-rules="{ select_cohort }"
              :validation-messages="{
                select_cohort: 'Cohort is required'
              }"
              
              :classes="{
                outer: 'w-32 text-center flex flex-col items-center',
                inner: 'mt-2 shadow border border-slate-600 appearance-none rounded py-2 px-2 w-24',
                input: 'w-18 bg-container text-white border-none p-0 focus:outline-none focus:border-transparent',
                messages: 'text-red-600 pt-3'
              }"
              :options="cohorts"
              @change="findGroup"
            />
          </div>
          <div>
            <FormKit
            v-if="select_cohortReady"
              type="select"
              label="Group :"
              name="group"
              placeholder="Group"
              validation="required"          
              validation-visibility="blur"
              :validation-rules="{ select_group }"
              :validation-messages="{
                select_group: 'Group is required'
              }"
              :classes="{
                outer: 'w-32 text-center flex flex-col items-center',
                inner: 'mt-2 shadow border border-slate-600 appearance-none rounded py-2 px-2 w-24',
                input: 'w-18 bg-container text-white border-none p-0 focus:outline-none focus:border-transparent',
                messages: 'text-red-600 pt-3'
              }"
              :options="groups"
            />
          </div>
        </div>
        <div class="flex flex-col md:flex-row mt-3 justify-evenly items-center">
          <input
            type="button"
            class="text-black text-lg  rounded-md p-2 tracking-wider font-medium cursor-pointer "
            @click="openUploadWidget()"
            value="Upload profile image"
          />
          <CloudImage
            :image-name="uploadedImage"
            :key="uploadedImage"
            style="width: 120px; height: 120px; border-radius: 50%; border: solid 1px var(--border);"
          />
        </div>
        <div class="flex flex-row justify-evenly mt-6">
          <button
            type="button"
            class="delete w-1/4 text-lg mt-2 p-2 bg-red-400 hover:bg-red-700 text-black text-center font-medium rounded-md"
            @click="redirectToLogin"
          >
            Cancel
          </button>
          <input
          type="submit"
          class="text-black text-lg mt-2 rounded-md p-2 tracking-wider font-medium cursor-pointer"
          value="Register"
        />
        </div>
  
      </FormKit>

      <!-- La variable "uploadedImage" es la que tiene el id de la imagen que se busca en Cloudinary para mostrar, eso deberia ser lo que se mande en el form -->

      <span class="mt-2 text-center"
        >Do you already have an account?
        <RouterLink :to="{ name: 'login' }"
          ><span class="link"
            >Sign in here</span
          ></RouterLink
        >
      </span>
    </div>
  </div>

</template>

<style lang="scss" scoped>

.loader {
  background-color: hsl(0 0% 0% / .6);
  z-index: 10001;
}

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
  font-size: 16px;

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
  width: 60%;
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
  border: solid 1px var(--border);
  color: black; 
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
.link{
  text-decoration: underline;
  font-size: 18px;
  color: var(--details);
}
.link:hover{
  color: var(--title);
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
.calendar-icon {
  color: red;
}
</style>
