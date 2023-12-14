<script setup>
import { onMounted, ref } from "vue";
import { useAccessStore } from "../stores/userStore";
import ClienteService from "../services/ClienteService";
import { useRouter } from "vue-router";
import { FormKit } from "@formkit/vue";
import CloudImage from "../components/CloudImage.vue";
import socket from "./../lib/socket";
import Helpers from "../helpers";
import BackgroundParticles from "../components/UI/BackgroundParticles.vue";
import FooterVue from "../components/Footer.vue";
const store = useAccessStore();
const router = useRouter();

const widget = window.cloudinary.createUploadWidget(
  { cloud_name: "HenryMoon", upload_preset: "sm7kib26" },
  (error, result) => {
    if (!error && result && result.event === "success") {
      uploadedImage.value = result.info.public_id;
    }
  }
);

// ! //////////////////

const cohorts = ref([])
const countries = ref([])
onMounted(async ()=> {
  const response = await ClienteService.getAllCohorts()
  cohorts.value = [ ...response.data]

  const {data: countriesData} = await ClienteService.getAllCountries()
  countries.value = [...Helpers.beautifyCountries(countriesData)]

})

function openUploadWidget() {
  widget.open();
}

const groups = ref([])
const select_cohortReady = ref(false)
const findGroup = async (e) => {
  select_cohortReady.value = true
  if(e.target.value !== '---') {
    const {data} = await ClienteService.getAllGroups(e.target.value)
    if(groups.value.lenth <= 1) {
      groups.value = [...data]
    } else {
      groups.value = [...data]
    }
  }
}

const uploadedImage = ref("Users/nx0xistql7jbamjxca5u");

const handleSubmit = async (dataForm) => {
  dataForm.image = store.completeProfile.image
    ? store.completeProfile.image
    : uploadedImage.value;
  const create = ref(false);

  if (!Object.keys(dataForm).includes("name")) {
    dataForm.name = store.completeProfile.name;
  }
  if (!Object.keys(dataForm).includes("email")) {
    dataForm.email = store.completeProfile.email;
  }

  ClienteService.findUserByEmail({ email: dataForm.email })
    .then(async ({ data }) => {
     if (data.length) {
      
       if (data[0].isBanned) {
       store.updateProfile({...store.user, ...dataForm})  
         router.push({ name: "banned" });
         return;
       } else if (data[0].isDeleted) {
         store.updateProfile({...store.user, ...dataForm})  
         router.push({ name: "recover" });
         return;
       } else if(!data[0].isBanned && !data[0].isDeleted){
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
          const { data } = await ClienteService.registerThird(dataForm);

          
          if (data.access) {
            store.login(data.user);
            socket.emit("new-user");
            router.push({ name: "home" });
          }
        } catch (error) {
        }
      }
    });
};

</script>
<template>
  <div
    class="text-white overflow-x-hidden h-screen w-screen flex items-center justify-center"
  >
  <BackgroundParticles />
    <div
      class="--container--"
    >
      <FormKit
        type="form"
        :actions="false"
        incomplete-message="Make sure all fields are filled"
        form-class="w-[100%] grid"
        messages-class="text-red-600"
        @submit="handleSubmit"
      >
        <FormKit
          v-if="!store.completeProfile.name"
          type="text"
          name="name"
          placeholder="Name"
          placeholder-class="input:focus:placeholder-transparent"
          validation="required"
          :validation-messages="{
            required: 'Name is required',
          }"
          validation-visibility="blur"
          input-class="pb-2 mt-7 caret-yellow-400 bg-container border-b-2 border-border focus:outline-none w-[100%] focus:placeholder-transparent"
          messages-class="text-red-600"
        />
        <FormKit
          v-if="!store.completeProfile.email"
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
          input-class="pb-2 mt-7 caret-yellow-400 bg-container border-b-2 border-border focus:outline-none w-[100%] focus:placeholder-transparent"
          messages-class="text-red-600"
        />
        <FormKit
          type="select"
          name="country"
          :options="countries"
          placeholder="Country"
          placeholder-class="input:focus:placeholder-transparent"
          validation="required"
          :validation-messages="{
            required: 'Country is required',
          }"
          validation-visibility="blur"
          input-class="pb-2 mt-7 bg-container border-b-2 border-border focus:outline-none w-[100%] focus:placeholder-transparent"
          messages-class="text-red-600"
        />
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
          input-class="pb-2 mt-7 bg-container border-b-2 border-border focus:outline-none w-[100%] focus:placeholder-transparent"
          messages-class="text-red-600"
        />
        <!-- ! /////////// -->
        <div class="mt-5 flex flex-row justify-around items-center">
          <div>
            <FormKit
            type="select"
            name="cohort"
            label="Cohort :"
            placeholder="Cohort"
            validation="required"
            validation-visibility="blur"
            :validation-messages="{
              required: 'Cohort is required'
            }"
            :classes="{
            outer: 'w-32 text-center flex flex-col items-center',
                inner: 'mt-2 shadow border border-border appearance-none rounded py-2 px-2 w-24',
                input: 'w-18 bg-container text-title border-none p-0 focus:outline-none focus:border-transparent',
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
            :validation-messages="{
              required: 'Cohorte is required',
              format: 'Formato de cohorte inválido. Por favor, ingresa 2 números seguidos de una letra.'
            }"
            :classes="{
               outer: 'w-32 text-center flex flex-col items-center',
                inner: 'mt-2 shadow border border-border appearance-none rounded py-2 px-2 w-24',
                input: 'w-18 bg-container text-tile border-none p-0 focus:outline-none focus:border-transparent',
                messages: 'text-red-600 pt-3'
            }"
            :options="groups"
          />
          </div>
          

        </div>
        <div class="flex flex-col md:flex-row mt-5 justify-evenly items-center">
          <input
            v-if="!store.completeProfile.image"
            type="button"
            class="text-black text-xl mt-9 rounded-md p-2 tracking-wider font-medium cursor-pointer justify-items-end"
            @click="openUploadWidget()"
            value="Upload profile image"
          />
          <br />

          <CloudImage
            v-if="!store.completeProfile.image"
            :image-name="uploadedImage"
            :key="uploadedImage"
            style="width: 150px; height: 150px; border-radius: 50%; border: solid 1px var(--border);"
          />
          <!-- La variable "uploadedImage" es la que tiene el id de la imagen que se busca en Cloudinary para mostrar, eso deberia ser lo que se mande en el form -->
        </div>
        <input
          type="submit"
          class="text-black text-xl mt-9 rounded-md p-2 tracking-wider font-medium cursor-pointer justify-items-end"
          value="Send"
        />
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
  border: solid 1px var(--details);
}

input[type="button"]:hover {
  background-color: var(--border);
  color: var(--container);
  border: solid 1px var(--title);;
}

input[type="button"]:disabled {
  background-color: #d4bf0489;
  color: #00000087;
}
</style>
