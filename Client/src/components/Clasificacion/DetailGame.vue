<script setup>
import { onMounted, ref } from "vue";
import ClienteService from "../../services/ClienteService";
import { useRouter } from "vue-router";
import { useGames, useComments } from "../../stores/gameStore";
import { useAccessStore } from "./../../stores/userStore";

const storeGame = useGames();
const storeComment = useComments()
const router = useRouter();
const allUsers = ref([])
const userStore = useAccessStore()

const playGame = async (id) => {
  if(!storeGame.game.isOwn) {
    const {data: ranking} = await ClienteService.countRankingThird({
      userID: userStore.user._id,
      gameID: id,
      cohort: userStore.user.cohort,
      group: userStore.user.group,
      isOwn: storeGame.game.isOwn,
    })
  }
  router.push(`/game/${id}`);
}

onMounted(async ()=> {
const {data} = await ClienteService.gameRanking(storeGame.game._id)
allUsers.value = [...data]
})
</script>

<template>

  <div class="flex flex-col items-center justify-center w-full h-fit p-2 ">

  <div class="container">
    <h1>
      {{ storeGame.game.name }} <span class="block ">{{ storeComment.average }}     ★ </span> 
    </h1>
    <img
    :src="storeGame.game.image"
    class="w-[90%] h-1/2 object-cover border border-border"
    alt="game"
    />
    <p>
      {{ storeGame.game.description }}
    </p>
    <button class="bg-details p-3 m-3 rounded-md text-black font-bold w-[100px] text-xl hover:bg-green-800 hover:text-white"
      @click="playGame(storeGame.game._id)">PLAY</button>
  </div>
  <div
        class="points-container"
        v-if="storeGame.game.isOwn && allUsers.length > 0"
    >
      <h2>GAME PODIUM</h2>
      <ul class="w-full p-3">
        <div class="w-full flex flex-row justify-between m-1 row-color" v-for="(user, i) in allUsers" :key="user.id" :class="{ 'highlighted-user': user.user[0].name === userStore.user.name }">
          {{ i + 1 }}. {{ user.user[0].name }} <span>Score: {{ user.total }}</span>
        </div>
      </ul>
    </div>
        
  </div>

</template>

<style scoped>

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--container);
  align-items: center;
  width: 90%;
  height: 100%;
  padding: 5px;
  border: solid 1px var(--border);
  border-radius:10px;
}
.container h1{
  text-align: center;
  color: var(--title);
  font-size: x-large;
  padding: 5px;
  font-weight: bold;
}
.container p{
  text-align: justify;
  color: var(--title);
  font-size:larger;
  margin: 10px;
  padding: 5px;
}
.points-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--title);
  width: 90%;
  height: fit-content;
  margin: 5px;
  padding: 5px;
  background-color: var(--container);
  border-radius:10px;
  font-weight: bold;
  border: solid 1px var(--border);
}
.highlighted-user {
  color: var(--details);
}
</style>
