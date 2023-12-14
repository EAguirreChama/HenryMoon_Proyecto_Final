<script setup>
import { onMounted } from 'vue';


  const props = defineProps({
    donation: {
      type: Object
    },
    user: {
      type: Object
    }
  })

</script>

<template>
    <div class="tarjeta" :class="(user?.email === donation?.email) ? 'ownDonation' : ''">
      <p>{{ donation.name }}</p>
      <p>{{ donation.email }}</p>
      <p>${{ donation.value }} ({{ donation.currency_code }})</p>
  </div>
</template>

<style scoped>

.tarjeta {
  background-color: var(--container);
  border-radius: 10px;
  margin: 0.5rem;
  padding: 0.5rem;
  width: 220px;
  font-size: 16px;
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  flex-direction: column;
  color: var(--title);
}

@media screen and (max-width: 640px) {
  .tarjeta {
    width: 40;
    font-size: 14px;
  }
}

.ownDonation {
  border: 1px solid var(--details);
  background-color: hsl(60 100% 60% / .15)
}

</style>