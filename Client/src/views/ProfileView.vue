<script setup>
import ClienteService from "../services/ClienteService";
import socket from "../lib/socket";
import { useAccessStore } from "../stores/userStore";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import CloudImage from "../components/CloudImage.vue";
import Ranking from "../components/Ranking.vue";
import FooterVue from "../components/Footer.vue";
const store = useAccessStore();
const router = useRouter();
/* ! Genera error */
import clienteService from "../services/ClienteService";
const totalPoints = ref(0);

const histories = ref([]);
const confirm = ref(false)
onMounted(async () => {
  if (!store.access) {
    router.push({ name: "login" });
    return;
  } else {
    const { data } = await ClienteService.getRankingInGamesByUser(
      store.user._id
    );
    if (data.length) {
      totalPoints.value = data.reduce((total, game) => {
        return total + game.total;
      }, 0);
    }
  }

  const { data } = await clienteService.getRankingInGamesByUser(store.user._id);

  histories.value = data;
});

const handleConfirm = ()=>{
  if(confirm.value){
    confirm.value = false
  }else{
    confirm.value = true
  }
}

const deleteUser = () => {
    const userId = store.user._id;

    ClienteService.deleteUserById(userId)
      .then(async () => {
        await ClienteService.logout(store.user);
        router.push({ path: `/deleted/${userId}` });
      })
      .catch((error) => {
        console.error("Error deleting user: ", error);
      });
};

const updateUser = () => {
  router.push({ name: "updateUser" });
};

const checkImage = store.user.image?.split("/").length;
</script>

<template>
  <div
    class="h-[100%] flex flex-col justify-center m-auto overflow-auto"
    v-if="store.access"
  >
  <h1 class="text-title text-2xl mt-32 text-center font-bold">MY PROFILE</h1>
    <div class="p-2 flex flex-col md:flex-row overflow-hidden">
      <div class="md:w-2/3 flex flex-col items-center p-3 m-2">
        <div class="--container--">
          <div class="flex flex-col items-center">
            <div class="profileImg">
              <!-- ! //////// Generan error -->
              <img
                :src="store.user.image"
                alt=""
                v-if="checkImage > 2"
                class="w-full h-full object-cover rounded-full"
              />
              <CloudImage
                :imageName="store.user.image"
                :key="store.user.image"
                v-else
                class="w-full h-full  object-cover rounded-full"
              />
              <!-- ! //////// Generan error -->
            </div>
            <div class="text-title text-xl text-center mt-2 font-bold">
              <p class="capitalize">{{ store.user.name }}</p>
              <p>Group {{ store.user.group }}</p>
            </div>
          </div>
          <div class="text-title">
            <p class="text-2xl mt-2 font-bold text-center uppercase">
              {{ store.user.name }} <span> {{ store.user.lastName }}</span>
            </p>
            <div class="text-2sm mt-4">
              <p class="mb-4 email">{{ store.user.email }}</p>
              <p class="flex justify-between details"><span class="font-bold">Birthday</span> <span>{{ store.user.birthdate.slice(0, 10) }}</span></p>
              <p class="flex justify-between details"><span class="font-bold">Country</span> <span>{{ store.user.country }}</span></p>
              <p class="flex justify-between details"><span class="font-bold">Cohort</span> <span>{{ store.user.cohort }}</span></p>
              <p  class="flex justify-between details" v-for="(TA, index) in store.user.groupDetail"><span class="font-bold">TA {{ index+1 }}</span> <span>{{ TA.TAname }}</span></p>
              <p  class="flex justify-between details"><span class="font-bold">Total Points</span> <span>{{ totalPoints }}</span></p>
            </div>
            <div class="flex flex-row justify-between mt-5 items-center">
              <button
                class="md:w-1/3 edit w-1/4 text-md mt-2 rounded-md p-1 tracking-wider font-medium "
                @click="updateUser"
              >
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button
                type="button"
                class="delete text-black text-lg mt-2 bg-red-500 rounded-md p-2 tracking-wider font-medium"
                @click="handleConfirm"
              >
                Delete <i class="fa-solid fa-user-xmark"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="gamesDiv">
          <h1>GAMES HISTORY</h1>
          <div
            v-for="(history, i) in histories"
            class="history w-full flex flex-row justify-between py-2 px-3 row-color"
          >
            <span>{{ i + 1 }}. <span class="font-bold">{{ history.game[0].name }}</span></span>
            <span>Times Played: {{ history.timesPlayed }}</span>
            <span
              >Total Points:
              {{ history.total === 0 ? "---" : history.total }}</span
            >
          </div>
        </div>
      </div>
      <div class="md:w-1/3 flex flex-col w-auto p-2 m-2">
        <div class="gamesDiv">
          <h1>RANKING</h1>
          <Ranking />
        </div>
      </div>
    </div>
  </div>
  <div v-if="confirm">
    <div  class="confirm">
      You're sure ?
      <div>
        <button  class="bt" @click="deleteUser">Yes <i class="fa-solid fa-check"></i></button>
        <button class="bt" @click="handleConfirm">Cancel <i class="fa-solid fa-xmark"></i></button>
      </div>
    </div>
  </div>
  <FooterVue />
</template>

<style lang="scss" scoped>

.ppal{
margin-top: 90px;
}

.--container-- {
  color: var(--title);
  background-color: var(--container);
  display: grid;
  grid-template-columns: 30% 60%;
  align-items: center;
  padding: 1rem;
  border: solid 2px var(--border);
  border-radius: 1rem;
  width: 100%;
  font-size: 18px;
  margin: 5px;
}
.confirm{
  font-weight: bold;
  z-index: 10000000;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  height: 70px;
  width: 200px;
  position: absolute;
  top: 300px;
  left: 45%;
  background-color: var(--details);
  color: #0f172a;
}
@media (max-width: 600px) {
  .--container-- {
    grid-template-columns: 100%;
  }
  .confirm{
  
  position: absolute;
  top: 600px;
  left: 45%;

}
}
@media (max-width: 317px) {
  .email {
    font-size: .9rem;
  }
  .details {
    font-size: .9rem;
  }
  .confirm{
  
  height: 70px;
  width: 180px;
  position: absolute;
  top: 600px;
  left: 35%;
font-size: .8rem;
}
}
@media (max-width: 550px) {
  .history{
    font-size: .9rem;
  }
}
@media (max-width: 350px) {
  .history{
    font-size: .68rem;
  }
}
.profileImg {
  border: solid 2px var(--border);
  width: 10rem;
  height: 10rem;
  margin: 3px;
  border-radius: 50%;
}

@media (max-width: 950px) {
  .profileImg {
    width: 8rem;
  height: 8rem;
  }
}
@media (max-width: 600px) {
  .profileImg {
    width: 12rem;
  height: 12rem;
  }
}
.edit {
  background-color: var(--details);
  transition: 0.5s;
  border: solid 1px var(--border);
  color: black;
}
.edit:hover {
  background-color: var(--border);
  color: var(--container);
  border: solid 1px var(--title);
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
.gamesDiv {
  color: var(--title);
  background-color: var(--container);
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: solid 2px var(--border);
  border-radius: 15px;
  width: 100%;
  height: 100%;
  font-size: 18px;
  margin: 5px;
}
.gamesDiv h1 {
  font-size: x-large;
  font-weight: bold;
  color: var(--title);
  text-align: center;
  position: sticky;
}
.gamesDiv span {
  color: var(--title);
  width: 150px;
  margin: 2px;
}

.ppal{
  margin-top: 60px;
}
.confirm{
  font-weight: bold;
  z-index: 10000000;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  height: 70px;
  width: 200px;
  position: absolute;
  bottom: 30px;
  right: 250px;
  background-color: var(--details);
  color: #0f172a;
}


.bt{
  width: 80px;
  height: 30px;
}

.bt:hover{
  border-radius: 5px;
  color: white;
  background-color: #0f172a;
  scale: 1.1;
}
</style>

