<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Stars from "./Stars.vue";
import { useGames, useComments } from "../../stores/gameStore";
import { useAccessStore } from "../../stores/userStore";
import ClienteService from "../../services/ClienteService";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const storeGame = useGames();
const storeComment = useComments();
const storeAccess = useAccessStore();
const classification = ref(0);
const comment = ref("");
const starsFilter = ref("");
const savedComments = ref([]);

const updateClassification = (rating) => {
  classification.value = rating;
};

const saveComment = async () => {
  const dataComment = {
    game: storeGame.game.name,
    email: storeAccess.user.email,
    stars: classification.value,
    comment: comment.value,
  };
  try {
     await ClienteService.postComment(dataComment);
    reload();
    toast.success("Published successfully", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
    });
  } catch (error) {}
};
const reload = () => {
  comment.value = "";
  classification.value = 0;
  const dataGame = { game: storeGame.game.name };
  ClienteService.getAllComments(dataGame).then(({ data }) => {
    storeComment.uploadComments(data);
    savedComments.value = storeComment.comments;
  });
};
onMounted(() => {
  reload();
});


onUnmounted(()=>{
  storeComment.uploadComments({average: 0, comments: []})
})

//////////////////////////
const handleChange = () => {
  if (starsFilter.value === "") {
    reload();
  } else {
    const dataComment = {
      stars: starsFilter.value,
    };
    ClienteService.filterComments(dataComment).then(({ data }) => {
      
        const newData = data.comments.filter(
        (comment) => comment.game === storeGame.game.name
      );
      storeComment.uploadComments({comments: newData});
      savedComments.value = storeComment.comments;
    });
  }
};

////////////// handleDelete

const handleDelete= async (id) => {
  await ClienteService.deleteComment(id)
  reload()
}
</script>

<template>
   <div class="flex flex-col items-center justify-center w-[60%] h-full m-2">
  <div class="container">
    <h1 class="classification">Classification</h1>
    <Stars :rating="classification" @update-rating="updateClassification" />
    <h2 class="classification">Comments</h2>
    <form @submit.prevent="saveComment" class="container-form">
      <textarea v-model="comment" cols="50" rows="4" class="text"></textarea>
      <button 
      type="submit" 
      class="w-14 h-14 m-3  bg-details border border-border hover:bg-border text-black text-center font-bold uppercase rounded-lg">Send</button>
    </form>
    <select
      @change="handleChange"
      v-model="starsFilter"
      name=""
      id=""
      class="text-title text-lg w-fit bg-container p-3 m-5 rounded-md border border-border hover:bg-border hover:text-black"
    >
      <option value="">All</option>
      <option value="1">1★</option>
      <option value="2">2★</option>
      <option value="3">3★</option>
      <option value="4">4★</option>
      <option value="5">5★</option>
    </select>
    <div class="h-96 overflow-y-auto mt-4">
      <div
        v-for="savedComment in savedComments"
        class="saved-comment w-96 p-3 rounded-lg"
      >
      <button
      v-if="savedComment.email === storeAccess.user.email"
          class="bg-details p-2 rounded-md text-black font-bold w-fit text-lg hover:bg-container hover:text-title"
          @click="handleDelete(savedComment._id)"
        >
          Delete
        </button>
        <h3 class="p-2">
          {{ savedComment.email }}:
          <span
            v-for="estrellas in +savedComment.stars"
            :key="estrellas"
            class="filled"
            @click="updateRating(estrellas)"
          >
            ★
          </span>
        </h3>
        <p class="p-2">{{ savedComment.comment }}</p>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 90%;

  padding: 5px;
  border: solid 1px var(--border);
  border-radius:10px;
  background-color: var(--container);
}
.saved-comment {
  border: 1px solid var(--border);
  margin-top: 10px;
  color: var(--title);
  background-color: var(--body);
}

.classification {
  color: var(--title);
  display: flex;
  justify-content: center;
  font-size: x-large;
  font-weight: bold;
  margin: 2px;
}

.container-form {
  color: var(--title);
  display: flex;
  justify-content: center;
  align-items: center;
}

.text {
  margin: 5px;
  color: var(--title);
  width: 80%;
  font-size: 18px;
  font-weight: bold;
  background-color: var(--body);
  border-radius: 15px;
  padding-left: 10px;
  border: 1px solid var(--border);
}


.filled {
  color: var(--details);
}
</style>
