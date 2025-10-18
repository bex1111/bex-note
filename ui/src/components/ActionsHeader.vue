<script setup>
import {deleteNote, saveNote} from "../api/bexNote";
import {notificationStore} from "../main";

const emit = defineEmits(['createNew', 'save', 'delete']);

const props = defineProps({
  selectedTitle: String,
  title: String,
  content: String
})

const handleDeleteNote = async () => {
  if (props.selectedTitle === props.title) {
    await deleteNote(props.title);
    emit('delete')
    notificationStore.$patch({
      type: 'warn',
      message: `"${props.title}" deleted successfully.`
    })
  }
};

const handleSaveNote = async () => {
  if (!props.selectedTitle) {
    await saveNote(props.title, props.content);
  } else {
    await deleteNote(props.selectedTitle);
    await saveNote(props.title, props.content);
  }
  emit('save')
  notificationStore.$patch({
    type: 'success',
    message: `"${props.title}" saved successfully.`
  })
}

const handleCreateNew = () => {
  emit('createNew');
}
</script>

<template>
  <prime-toolbar>
    <template #start>
      <div class="flex items-center gap-2">
      <prime-avatar image="/ico.png" class="avatar" />
      <span class="header-title">Bex Note</span>
      </div>
    </template>
    <template #end>
      <prime-button v-tooltip.bottom="'New note'" icon="pi pi-plus"
                    severity="secondary" class="mr-2" text
                    @click="handleCreateNew" />
      <prime-button v-tooltip.bottom="'Save'" icon="pi pi-save" severity="secondary" class="mr-2" text
                    @click="handleSaveNote" :disabled="!title"/>
      <prime-button v-tooltip.bottom="'Delete'" icon="pi pi-trash" severity="danger" class="mr-2" text
                    @click="handleDeleteNote" :disabled="!title"/>
    </template>
  </prime-toolbar>
</template>

<style scoped>
.header-title {
  font-size: 1.5rem;
  font-weight: bold;
}
.avatar {
  width: 2rem;
  height: 2rem;

}
</style>