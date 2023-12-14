import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoaderStore = defineStore("loader", () => {
    
  const loading = ref(false);

  const setLoading = (value) => {
    loading.value = value;
  };
  
  return {
    loading,
    setLoading
  };

});