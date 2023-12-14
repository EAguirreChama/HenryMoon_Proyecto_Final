<script setup>
import { computed } from "vue";
defineProps({
  member: {
    type: Object,
  },
  newMessages: {
    type: Number,
  },
  user: {
    type: Object,
  },
});
const isOnline = computed(() => {
  return props.member.status === "Online";
});
</script>

<template>

  <div class="member">
    <div

      :class="member.status === 'online'  || member._id === user._id? 'green' : 'red'"
    >
    </div>

    <span class="p1- m-1">{{ member?.name }}</span>
    <span 
      >{{ member._id === user._id ? " ( You )" : "" }}
    </span>
    <span 
      >{{ member.status === "online" || member._id === user._id? "(Online)" : "(Offline)" }}
    </span>
  </div>
</template>
<style lang="scss" scoped>
.green{
  width: 10px;
  height: 10px;

  background-color: rgb(39, 233, 0);

  border-radius: 50%;
}

.red{
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
}

.member{
  cursor: pointer;
  margin-left: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  color: var(--title);
}
</style>
