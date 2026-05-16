<script setup>
const selectedNote = defineModel();
defineProps({
  notes:Array
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
      data-test-id="title-selector"
  />
</template>

<style scoped>

</style>