<script setup>

import {toRef, watch} from "vue";


const title = defineModel()
const props = defineProps({
  selectedTitle: String
})

const selectedTitleRef = toRef(props, 'selectedTitle');

watch(selectedTitleRef, (newVal) => {
  if (newVal) {
    title.value = newVal;
  }
})

</script>

<template>
  <prime-fluid style=" margin-top: 0.75rem;">
    <prime-float-label variant="in">
      <label for="in_label">Give a title, like: Folder/Awesome title, Awesome title)</label>
      <prime-input id="in_label" v-model="title" type="text"/>
    </prime-float-label>
  </prime-fluid>
</template>

<style scoped>

</style>