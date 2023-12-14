import { ref, onMounted, watch } from "vue";
// import ClienteService from "../services/ClienteService";
import { defineStore } from "pinia";

export const useComments = defineStore("comments", () => {

  const comments = ref([]);
const average = ref(0)
  const uploadComments = (data) => {
    comments.value = data.comments;
    if (data.average) {
      average.value = data.average !== 'NaN' ? data.average : 0
    }
   
  };
  watch(comments, ()=> {
    localStorage.setItem("comments", JSON.stringify(comments.value));
    localStorage.setItem("average", JSON.stringify(average.value));
  })
  onMounted(() => {
    const commentsStorage = localStorage.getItem("comments");
    const averageStorage = localStorage.getItem("average")
    if (averageStorage !== null && averageStorage !== undefined) {
      average.value = JSON.parse(averageStorage);
    }
    
    if (commentsStorage !== null && commentsStorage !== undefined) {
      comments.value = JSON.parse(commentsStorage);
    }
  });
  return {
    comments,
    average,
    uploadComments
  };
 
});

export const useGames = defineStore("games", () => {
    
  const game = ref({});
  const games = ref([]);

  const uploadGame = (data) => {
    game.value = {...data };
  };
  const uploadGames = (data) => {
    games.value = [...data ];
  };
  watch(game, ()=> {
    localStorage.setItem("game", JSON.stringify(game.value));
  })
  onMounted(() => {
    const gameStorage = localStorage.getItem("game");
    if (gameStorage) {
      game.value = JSON.parse(gameStorage);
    }
  });
  return {
    game,
    games,
    uploadGame,
    uploadGames
  };
 
});

