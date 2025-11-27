<script setup>
import { useToast } from "primevue/usetoast";
import {notificationStore} from "../main";

const toast = useToast();

notificationStore.$subscribe((_, state) => {
  toast.add({ severity: state.type, summary: state.message, life: 5000 });
})

</script>

<template>
  <prime-toast/>
</template>

<style scoped>

</style>