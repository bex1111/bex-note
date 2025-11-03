<script setup>
import {loadStore} from "../main";
import {ref} from "vue";

const loading = ref(loadStore.loading)
loadStore.$subscribe((_, state) => {
  loading.value = state.loading
  console.log(state.loading)
})
</script>

<template>
  <div v-if="loading" class="loader-overlay">
    <div class="spinner-container">
      <prime-progress-spinner stroke-width="4"/>
    </div>
  </div>
</template>

<style scoped>
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  z-index: 9999;
}

.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>