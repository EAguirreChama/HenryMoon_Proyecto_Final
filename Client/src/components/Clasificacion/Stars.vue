<script setup>
    import { ref } from 'vue';

    const rating = ref(0);

    const totalEstrellas = 5;

   const emit= defineEmits(['updateRating']);

    const updateRating = (estrellas) => {
        rating.value = estrellas;
        emit('updateRating', rating.value)
    }
</script>

<template>
    <div class="star-rating">
        <span
            v-for="estrellas in totalEstrellas"
            :key="estrellas"
            class="estrellas"
            :class="{'filled': estrellas <= rating}"
            @click="updateRating(estrellas)"
        >
            ★
        </span>
    </div>
</template>

<style scoped>
    .star-rating {
        color: var(--title); 
        font-size: 40px;
        display: flex;
        justify-content: center;
        letter-spacing: 5px;
    }

    .star-rating :hover {
        color: var(--details)
    }

    .estrellas {
        cursor: pointer;
    }

    .filled {
        color: yellow;
    }
</style>