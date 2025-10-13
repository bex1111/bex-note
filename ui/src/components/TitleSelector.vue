<script setup>
import {ref} from "vue";
import {getNoteList} from "../api/bex-note";
import {tokenStore} from "../main";

const selectedFile =  defineModel();
const files = ref([]);

tokenStore.$subscribe(async (mutation) => {
  if (mutation.payload && mutation.payload.token) {
    files.value = await getNoteList();
  }
})

</script>

<template>
  <prime-select
      v-model="selectedFile"
      :options="files"
      optionLabel="filename"
      optionValue="filename"
      filter
      placeholder="Select a file"
      fluid
  />
</template>

<style scoped>

</style>