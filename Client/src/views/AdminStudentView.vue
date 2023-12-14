<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, onUnmounted, ref } from "vue";
import ClienteService from "../services/ClienteService";
import { useUsers, useAccessStore } from "../stores/userStore";
import CloudImage from "../components/CloudImage.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import FooterVue from "../components/Footer.vue";
const storeUsers = useUsers();
const storeAccess = useAccessStore()
const route = useRoute();
const router = useRouter();
const id = route.params.id;
const user = ref({});
const cohortValue = ref("");
const groupValue = ref("");
const cohorts = ref(new Set());
const groups = ref(new Set());
//////////////////////////////////////////////////
const banUser = async () => {
  if (user.value.isBanned) {
    const { data } = await ClienteService.unBanUser(id);
    toast.success("Unbanned", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
    });
    ClienteService.getAllUsers().then(({ data }) => {
      storeUsers.uploadUsers(data);

      user.value = storeUsers.users.find((user) => user._id === id);
    });
  } else {
    const { data } = await ClienteService.banUser(id);
    toast.warning("Banned", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
    });
    ClienteService.getAllUsers().then(({ data }) => {

      storeUsers.uploadUsers(data);

      user.value = storeUsers.users.find((user) => user._id === id);
    });
  }
};
const checkImage = ref(0);

onMounted(() => {

  if (!storeAccess.access) {
    router.push({ name: "login" });
    return
  }

  user.value = storeUsers.users.find((user) => user._id === id);
  checkImage.value = user?.value.image.split("/").length;
  cohortValue.value = user.value.cohort;
  groupValue.value = user.value.group;
  

  //---------------------------//

  for (let i = 0; i < storeUsers.users.length; i++) {
    if (!cohorts.value.has(storeUsers.users[i].cohort)) {
      cohorts.value.add(storeUsers.users[i].cohort);
    }
  }
  const cohortsArray = [...cohorts.value];
  cohortsArray.sort();
  cohorts.value = new Set(cohortsArray);

  //---------------------------------------//

  for (let i = 0; i < storeUsers.users.length; i++) {
    if (storeUsers.users[i].cohort === storeAccess.user.cohort) {
      if (!groups.value.has(storeUsers.users[i].group)) {
        groups.value.add(storeUsers.users[i].group);
      }
    }
  }
});
onUnmounted(() => {
  user.value = {};
});

////////////////////////////////

const updateUser = () => {
 const dataUpdate = {
  cohort: cohortValue.value,
  group: groupValue.value
 }
 ClienteService.updateUserById(id, dataUpdate).then(({data})=> {
  user.value = {...data}
  toast.success("The user was successfully updated", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
    });
 })

 ClienteService.getAllUsers().then(({data})=>{
  storeUsers.uploadUsers(data)
 })
 return
};
</script>
<template>
  <div
    class="--container--  p-2 flex flex-col  items-center md:flex-row"
  v-if="storeAccess.access"
    >
    <div class="box">

      <div class="ppal">
      <div class="flex flex-col items-center">
        <div
          class="border border-yellow-300 w-[200px] m-3 rounded-full overflow-hidden"
        >
          <img
            :src="user.image"
            alt=""
            v-if="checkImage > 2"
            class="w-60 border border-yellow-400 rounded-full object-cover"
          />
          <CloudImage :imageName="user.image" :key="user.image" v-else />
        </div>
        <div class="text-white text-3xl font-bold">
          <p>{{ `${user.name} ${user.group}` }}</p>
        </div>
      </div>
  
      <div class="md:w-2/3 m-3  flex flex-col items-center text-white">
  
        <div class="text-2xl m-4 text-left">
          <p>{{ user.email }}</p>
          <p>
            Cohort
            <select
              name=""
              id=""
              v-model="cohortValue"
              class="text-white text-lg bg-gray-800 p-3 rounded-md border border-yellow-300 hover:bg-yellow-400 hover:text-black"
            >
              <option v-for="cohort in cohorts" :value="cohort">
                {{ cohort }}
              </option>
            </select>
          </p>
          <p>Group <select
              name=""
              id=""
              v-model="groupValue"
              class="text-white text-lg bg-gray-800 p-3 rounded-md border border-yellow-300 hover:bg-yellow-400 hover:text-black"
            >
              <option v-for="group in groups" :value="group">
                {{ group }}
              </option>
            </select></p>
          <p>TA: TA-Name</p>
          <p>Total Points: 500</p>
        </div>
        <span class="text-lg"
          ><button
            type="button"
            :class="[
              user.isBanned
                ? 'bg-red-400 hover:bg-red-700'
                : 'bg-green-400 hover:bg-green-700',
            ]"
            class="w-fit px-10 text-black text-center font-bold uppercase rounded-lg"
            @click="banUser"
          >
            {{ !user.isBanned ? "unbanned" : "banned" }}
          </button></span
        >
  
        <span class="text-lg"
          ><button
            class="w-fit m-5 px-10 bg-yellow-400 hover:bg-yellow-700 text-black text-center font-bold uppercase rounded-lg"
            @click="updateUser"
          >
            Update user
          </button></span
        >
      </div>
    </div>
  </div>
    </div>
  <FooterVue />
</template>

<style lang="scss" scoped>
.box{
  display: flex;
  justify-content: center;
  width: 100%;
}
.ppal{
  width: 40rem;
  border: 2px solid var(--details);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 100px;
}
</style>
