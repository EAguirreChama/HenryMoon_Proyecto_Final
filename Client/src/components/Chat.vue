<script setup>
import socket from "../lib/socket";
import { useAccessStore, useChatStore } from "../stores/userStore";
import { ref, onMounted, onUnmounted, watch } from "vue";

const store = useAccessStore();

const message = ref("");
const messages = ref([]);

const chatStore = useChatStore();
const isMessageEventRegistered = ref(false);

const handleSubmit = (event) => {
  event.preventDefault();
  
  const newMessage = {
    from: store.user.name?store.user.name:'Anonymous',
    body: chatStore.message,
  };
  chatStore.addMessage(newMessage);

  socket.emit("message", newMessage);
  chatStore.clearMessage();
};

onMounted(() => {
  const receiveMessage = (message) => {
    chatStore.addMessage(message);
  };

  if (!isMessageEventRegistered.value) {
    socket.on("message", receiveMessage);
    isMessageEventRegistered.value = true;
  }
});

onUnmounted(() => {
  if (isMessageEventRegistered.value) {
    socket.off("message");
    isMessageEventRegistered.value = false;
  }
});
</script>

<template>
  <div class="border-2 border-yellow-400 max-h-[90%] flex flex-col rounded-md m-2 p-2 overflow-auto">
    <p class="text-sky-50 text-justify" v-for="mess in chatStore.messages" :key="mess.from">
      <span class="text-yellow-400">{{ mess.from }}:</span> {{ mess.body }}
    </p>
  </div>
  <form class="flex flex-row  sticky bottom-0 w-full" @submit="handleSubmit ">
    <input class="text-white bg-gray-800 border border-yellow-400 m-2 w-3/4" type="text" v-model="chatStore.message" />
    <button class="text-black m-2 p-2 bg-yellow-400">Send</button>
  </form>
</template>



<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 7px;
  background-color: var(--border);

}

::-webkit-scrollbar-thumb {
  background-color: var(--principal);
  border-radius: 5px;
}
</style>
