<script setup>
import { ref } from "vue";
import { useUsers } from "../stores/userStore";
const store = useUsers();

defineEmits(["handle-search"]);
const props = defineProps({
  emailProp: {
    type: String,
    required: true,
  },
});
const dataForm = ref({ email: '' });
const handleChange = (event) => {
  store.uploadEmail(event.target.value);
  dataForm.value.email = event.target.value
};


</script>

<template>
  <div class="container">
    <form
      @submit.prevent="$emit('handle-search', dataForm)"
      class="w-[100%] flex justify-center items-center"
    >
      <input
        type="search"
        name="email"
        class="text-title input:focus:placeholder-transparent bg-transparent pb-2 pl-2 caret-details bg-black border-b-2 focus:outline-none focus:placeholder-transparent"
        v-model="store.email"
        placeholder="Enter a user's email"
        @change="handleChange"
      />
      <input
        type="submit"
        class="text-black text-xl ml-3 rounded-md p-2 m-1 tracking-wider font-medium cursor-pointer justify-items-end"
        value="Search"
      />
    </form>
  </div>
</template>

<style lang="scss" scoped>
input[type="submit"] {
  background-color: var(--border);
  transition: 0.5s;
  display: block;
}

input[type="submit"]:hover {
  background-color: #ffef5c;
}

input[type="submit"]:disabled {
  background-color: #ffe6008c;
  color: #00000087;
}
.container {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 15px;
  margin-bottom: 10px;
}
</style>
