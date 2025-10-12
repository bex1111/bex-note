<script setup>
import { ref } from 'vue';

const files = ref([
  { label: 'file1.mddsjfgndskjfgbadkjsbfkjhedbfkhsdbfkhgbdkfbgdakjsfbakjsdbfjhsdfbhvbdahjkfv/dfgadbhjfgasvf', value: 'file1.md' },
  { label: 'file2.md', value: 'file2.md' },
  { label: 'notes.txt', value: 'notes.txt' },
]);
const selectedFile = ref(null);
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