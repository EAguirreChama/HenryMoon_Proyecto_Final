<script setup>
import { FormKit } from "@formkit/vue";
import { useRouter } from "vue-router";
import ClienteService from "../services/ClienteService";
import BackgroundParticles from "../components/UI/BackgroundParticles.vue";
import { useAccessStore } from "../stores/userStore";
import CloudImage from "../components/CloudImage.vue";
import { onMounted, ref } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import Helpers from "../helpers";
import FooterVue from "../components/Footer.vue";

const store = useAccessStore();
const router = useRouter();

let user = ref({});
const countries = ref([]);

onMounted(async () => {
  if (!store.access) {
    router.push({ name: "login" });
    return;
  } else {

    user.value = { ...store.user };


    const { data: countriesData } = await ClienteService.getAllCountries();
    countries.value = [...Helpers.beautifyCountries(countriesData)];
  }
});

const widget = window.cloudinary.createUploadWidget(
  { cloud_name: "HenryMoon", upload_preset: "sm7kib26" },
  (error, result) => {
    if (!error && result && result.event === "success") {
      uploadedImage.value = result.info.public_id;
      user.image = uploadedImage;
      checkImage = 2;
    }
  }
);

function openUploadWidget() {
  widget.open();
}
let uploadedImage = ref(store.user.image);
const handleSubmit = async (dataForm) => {
  dataForm.image = uploadedImage.value;
  try {
    const { data } = await ClienteService.updateUserById(user._id, dataForm);

    store.updateProfile(data);
    router.push({ name: "profile" });
  } catch (error) {
    toast.warning("Wrong", {
      autoClose: 3000,
    });
  }
};
const date = store.user.birthdate
  ? store.user.birthdate.slice(0, 10)
  : "01/01/2000";

const redirectToProfile = () => {
  router.push({ name: "profile" });
};

let checkImage = user.image
  ? user.image.split("/").length
  : store.user.image.split("/").length;
</script>
<template>
  <div
    class="overflow-x-hidden h-screen w-screen flex flex-col items-center justify-center"
    v-if="store.access"
  >
    <BackgroundParticles />
    <h1 class="text-title text-2xl mb-5 font-bold">EDIT MY PROFILE</h1>
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
          v-model="user.name"
          placeholder-class="input:focus:placeholder-transparent"
          validation="required"
          :validation-messages="{
            required: 'Name is required',
          }"
          validation-visibility="blur"
          input-class="pb-2 mt-7 bg-container border-b-2 border-border focus:outline-none w-[100%] focus:placeholder-transparent"
          messages-class="text-red-600"
        />
        <FormKit
          type="text"
          name="lastName"
          placeholder="Last Name"
          v-model="user.lastName"
          placeholder-class="input:focus:placeholder-transparent"
          validation="required"
          :validation-messages="{
            required: 'Last Name is required',
          }"
          validation-visibility="blur"
          input-class="pb-2 mt-7 bg-container border-b-2 border-border focus:outline-none w-[100%] focus:placeholder-transparent"
          messages-class="text-red-600"
        />

        <FormKit
          type="select"
          name="country"
          :options="countries"
          placeholder="Country"
          v-model="user.country"
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
          type="text"
          name="birthdate"
          placeholder="Birthdate"
          v-model="date"
          disabled
          placeholder-class="input:focus:placeholder-transparent"
          validation="required"
          :validation-messages="{
            required: 'Birthdate is required',
          }"
          validation-visibility="blur"
          input-class="pb-2 mt-7 bg-container border-b-2 border-border focus:outline-none w-[100%] focus:placeholder-transparent"
          messages-class="text-red-600"
        />
        <input
            type="submit"
            class="text-black w-1/3 text-lg mt-2 rounded-md p-2 tracking-wider font-bold cursor-pointer"
            value="Update"
          />
        </FormKit>



        <div class="flex flex-row md:flex-row mt-5 justify-between items-center">
          <button
            class="text-title md:text-lg text-md mt-9 mr-5 rounded-md p-2 tracking-wider font-bold cursor-pointer buttonUpload"

            @click="openUploadWidget()"
          >
            Upload image <i class="fa-solid fa-cloud-arrow-up"></i>
          </button>

          <div v-if="uploadedImage">
            <img
              :src="user.image"
              alt=""
              v-if="checkImage > 2"
              class="w-60 border border-border rounded-full object-cover"
            />
            <CloudImage
              :image-name="uploadedImage"
              :key="uploadedImage"
              v-if="checkImage === 2"
              style="
                width: 150px;
                height: 150px;
                border-radius: 50%;
                border: solid 2px var(--border);
              "
            />
          </div>
          <div v-else>
            <img
              :src="store.user.image"
              alt=""
              v-if="checkImage > 2"
              class="w-60 border border-border rounded-full object-cover"
            />
            <CloudImage
              :image-name="store.user.image"
              :key="store.user.image"
              v-else
              style="width: 150px; height: 150px"
            />
          </div>
        </div>

        <div class="flex flex-row justify-start w-[100%] mt-6">

          <button
            type="button"
            class="delete w-fit text-lg mt-2 p-2 px-3 bg-red-400 hover:bg-red-700 text-black text-center font-bold rounded-md"
            @click="redirectToProfile"
          >
        
            Cancel
          </button>

          
        </div>


      <!-- La variable "uploadedImage" es la que tiene el id de la imagen que se busca en Cloudinary para mostrar, eso deberia ser lo que se mande en el form -->
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
  width: 60%;
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
  color: black;
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

.buttonUpload {
  background-color: var(--details);
  transition: 0.5s;
  border: solid 1px var(--border);
  width: fit-content;
  color: black;
}

.buttonUpload:hover {
  background-color: var(--border);
  color: var(--container);
  border: solid 1px var(--title);
}

.buttonUpload:disabled {
  background-color: #d4bf0489;
  color: #00000087;
}
.delete {
  transition: 0.5s;
  border: solid 1px var(--border);
}
.delete:hover {
  background-color: var(--border);
  color: var(--container);
  border: solid 1px var(--title);
}
</style>
