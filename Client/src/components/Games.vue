<script setup>

import { useRouter } from "vue-router";
import { useGames } from "../stores/gameStore";
import { onMounted, ref, watch, computed } from 'vue';
import ClienteService from '../services/ClienteService';
import { useAccessStore } from "./../stores/userStore";

const userStore = useAccessStore()
const storeGame = useGames()
const router = useRouter()
const games = ref([])


const openGame = async (name) => {
  const gameToStore = games.value.find(game => game._id === name)
  storeGame.uploadGame(gameToStore)
  if(!gameToStore.isOwn) {
    const {data: ranking} = await ClienteService.countRankingThird({
      userID: userStore.user._id,
      gameID: name,
      cohort: userStore.user.cohort,
      group: userStore.user.group,
      isOwn: gameToStore.isOwn,
    })

  }
  router.push(`/game/${name}`)
}

// Acá brindaremos el método para cargar el store del juego y 
// el router push

const openDetailGame = (gameName) => {
  const gameToStore = games.value.find(game => game.name === gameName)
  storeGame.uploadGame(gameToStore)
  router.push({ name: 'detailGame' })

}

onMounted(async () => {
  const { data } = await ClienteService.getAllGames()
  games.value = data.sort((g1, g2) => {// ordenamos, primero se mostrarán los propios
    if(g1.isOwn && g2.isOwn) return 0
    return g1.isOwn ? -1: 1
  } )
  storeGame.uploadGames(data)
  setPages()
});

// Aqui empieza la logica del Paginado
const currentGames = ref(storeGame.games);
const page = ref(1);
const gamesPerPage = 4;
const pages = ref([]);

watch(storeGame.games, () => {
  currentGames.value = storeGame.games;
  setPages();
});

const displayedGames = computed(() => {
  const from = (page.value - 1) * gamesPerPage;
  const to = page.value * gamesPerPage;
  return storeGame.games.slice(from, to);
})

const previusPage = () => {
 if(page.value > 1) {
   page.value--;
 }
}

const nextPage = () => {
 if(page.value < pages.value.length) {
   page.value++;
 }
}

const setPages = () => {
  pages.value = Array.from({length: Math.ceil(storeGame.games.length / gamesPerPage)}, (_, index) => index + 1);
}

// Acá brindaremos el método para cargar el store del juego y
// el router push
</script>

<template>

<div class=" flex flex-col">
  <div class="flex flex-row justify-evenly flex-wrap  md:flex-row">    
    <div v-for="game in displayedGames" :key="game._id" class="container">
      <p>{{ game.name }}</p>
      <img :src="game.image" alt="" class="img" />
      
      <div class="container-button">
        <button class="button-play" @click="openGame(game._id)">PLAY <i class="fa-solid fa-play"></i></button>
        <button class="button-detail" @click="openDetailGame(game.name)">DETAIL <i class="fa-solid fa-circle-info"></i></button>

      </div>
    </div>
    
  </div>


  <div class="pag">
        <button
          type="button"
          class="bt"
          @click="previusPage"
          :disabled="page === 1"
        >
          Prev
        </button>


          <button
            type="button"
            v-for="pageNumber in pages"
            @click="page = pageNumber"
            :key="pageNumber"
            :class="[ page === pageNumber ? 'btsel': 'btnum']"
          >
            {{ pageNumber }}
          </button>

        <button
          type="button"
          @click="nextPage"
          :disabled="page === pages.length"
          class="bt"
        >
          Next
        </button>
      </div>
</div>
  
  
</template>


<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.pag{
  /* flex flex-row w-full space-x-4 justify-center */
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin-top: 10px;
}

.bt{
  background-color: var(--details);
  width: 70px;
  border-radius: 7px;
  color: #0f172a;
  margin-left: 10px;
  margin-right: 10px;
}

.bt:hover{
  border: 2px solid white;
  background-color: #0f172a;
  color: white;
}

.btnum{
  background-color: var(--details);
  width: 40px;
  border-radius: 7px;
  color: #0f172a;
  margin-left: 10px;
  margin-right: 10px;
}

.btnum:hover{
  border: 2px solid white;
  background-color: #0f172a;
  color: white;
}

.btsel{
  background-color: var(--details);
  width: 40px;
  border-radius: 7px;
  margin-left: 10px;
  margin-right: 10px;
  border: 2px solid white;
  background-color: #0f172a;
  color: white;
}

.img{
  width: 100%;
  border-radius: 10px;
}

.container {
  position: relative;
  width: 400px;
  height: fit-content;
  margin: 10px;
  text-align: center;
  border: solid 2px var(--details);
  border-radius: 10px;
  color: var(--title);
  font-size: large;
  overflow: hidden;
}

.container:hover {
  border: solid 2px var(--title);
}

.container:hover .container-button{
  opacity: 1;
}

.container-button {
  position: absolute;
  width: 400px;
  height: 100%;
  top: 0;
  opacity: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  background-color: #0f172ae3;
  transition: opacity 1s ease;
}

.button-detail {
  border-radius: 10px;
  color: #0f172a;
  background-color: var(--details);
  width: 100px;
  height: 50px;
}

.button-play {
  border-radius: 10px;
  color: #0f172a;
  background-color: var(--details);
  width: 100px;
  height: 50px;
}

.button-detail:hover{
  border: 2px solid white;
  color: white;
  background-color: #0f172a;
}

.button-play:hover{
  border: 2px solid white;
  color: white;
  background-color: #0f172a;
}

</style>
