<script setup>
const files = [
  {label: 'file1.mdsdfskhdfaiusdbfashdvFGHAWEV UWVEUYDFVS/SDFDFGSDFGSDFG/ADFSD/FGSDFGSDF', value: 'file1.mdsdfskhdfaiusdbfashdvFGHAWEV UWVEUYDFVS/SDFDFGSDFGSDFG/ADFSD/FGSDFGSDF'},
  {label: 'file2.md', value: 'file2.md'},
  {label: 'notes.txt', value: 'notes.txt'},
];

import {defineEmits, onMounted, ref, watch} from 'vue';
const selectedFile = ref(files[0].value);

const emit = defineEmits(['selectFile']);

onMounted(() => {
  emit('selectFile', files[0].value);
})

watch(selectedFile, (newVal) => {
  emit('selectFile', newVal);
});

</script>

<template>
  <prime-toolbar class="p-0">
    <template #start>
      <span class="header-title">Bex Note</span>
    </template>
    <template #center>
      <prime-select
          v-model="selectedFile"
          :options="files"
          optionLabel="label"
          optionValue="value"
          filter
          fluid
          placeholder="Select a file"
      />
    </template>
    <template #end>
      <prime-button icon="pi pi-save" severity="secondary" class="mr-2" text/>
      <prime-button icon="pi pi-trash" severity="danger" class="mr-2" text/>
    </template>
  </prime-toolbar>
</template>

<style scoped>
.header-title {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>