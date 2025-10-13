<script setup>

</script>

<template>
  <prime-toolbar>
    <template #start>
      <span class="header-title">Bex Note</span>
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