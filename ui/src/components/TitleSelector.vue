<script setup>
import {ref} from "vue";
import {getNoteList} from "../api/bexNote";
import {tokenStore} from "../main";

const selectedNote =  defineModel();
const notes = ref([]);

tokenStore.$subscribe(async (mutation) => {
  if (mutation.payload && mutation.payload.token) {
    notes.value = await getNoteList();
  }
})

</script>

<template>
  <prime-select
      v-model="selectedNote"
      :options="notes"
      optionLabel="title"
      optionValue="title"
      filter
      placeholder="Select a note"
      fluid
  />
</template>

<style scoped>

</style>