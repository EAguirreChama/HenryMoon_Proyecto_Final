<script setup>
import { onMounted, ref} from 'vue';
const link = ref('')
onMounted(async() =>  {
link.value = "https://video-app-4541-6703-dev.twil.io/"
});

</script>

<template>
  <div class="box">
    <div class="vcalled">
      <iframe class="iframe" :src="link">
      </iframe>
    </div>
  </div>
</template>



<style lang="scss" scoped>
.iframe{
  width: 100%;
  height: 100%;
  overflow: hidden
}


.box{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  padding: 10px;
  justify-content: center;
}
.vcalled{
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 2px solid #F2E500;
  border-radius: 10px;
  width: 90%;
  height: 750px;
  overflow: hidden
}
</style>
