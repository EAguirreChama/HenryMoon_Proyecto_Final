<script setup>
import {AdvancedImage} from '@cloudinary/vue';
import {Cloudinary} from "@cloudinary/url-gen"; 

const cld = new Cloudinary({
    cloud: {
        cloudName: "HenryMoon", //Nombre de la nube
    },
});

const props = defineProps({
    imageName: String
})

const myImg = cld.image(props.imageName) // Nombre del archivo como esta en la nube
</script>
<template>
    <AdvancedImage :cldImg="myImg" class="img-fluid" />
</template>

<!-- npm i @cloudinary/url-gen @cloudinary/vue -->