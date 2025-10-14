<script setup>
import {deleteNote, saveNote} from "../api/bex-note";

const emit = defineEmits(['createNew'])

const props = defineProps({
  selectedTitle: String,
  title: String,
  content: String
})

const handleDeleteNote = async () => {
  if (props.selectedTitle === props.title) {
    await deleteNote(props.title);
  }
};

const handleSaveNote = async () => {
  if (!props.selectedTitle) {
    await saveNote(props.title, props.content);
  } else {
    await deleteNote(props.selectedTitle);
    await saveNote(props.title, props.content);
  }
}

const handleCreateNew = () => {
  emit('createNew');
}
</script>

<template>
  <prime-toolbar>
    <template #start>
      <span class="header-title">Bex Note</span>
    </template>
    <template #end>
      <prime-button icon="pi pi-plus" severity="secondary" class="mr-2" text @click="handleCreateNew"/>
      <prime-button icon="pi pi-save" severity="secondary" class="mr-2" text @click="handleSaveNote"/>
      <prime-button icon="pi pi-trash" severity="danger" class="mr-2" text @click="handleDeleteNote"/>
    </template>
  </prime-toolbar>
</template>

<style scoped>
.header-title {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>