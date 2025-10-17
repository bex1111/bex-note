<template>
  <prime-card>
    <template #title>
      <ActionsHeader
          :selectedTitle="selectedTitle"
          :title="title"
          :content="content"
          @createNew="createNew"
          @save="refreshNotes"
          @delete="refreshNotes"
      />
    </template>
    <template #subtitle>
      <TitleSelector v-model="selectedTitle" :notes="notes"/>
      <TitleEditor v-model="title" :selected-title="selectedTitle"/>
    </template>
    <template #content>
      <MarkdownEditor v-model="content" :title="selectedTitle"></MarkdownEditor>
    </template>
  </prime-card>
  <LoginModal @login="refreshNotes"></LoginModal>
  <Notification></Notification>
</template>

<script setup>

import MarkdownEditor from "./components/MarkdownEditor.vue";
import ActionsHeader from "./components/ActionsHeader.vue";
import TitleEditor from "./components/TitleEditor.vue";
import LoginModal from "./components/LoginModal.vue";
import TitleSelector from "./components/TitleSelector.vue";
import {ref} from "vue";
import {getNoteList} from "./api/bexNote";
import Notification from "./components/Notification.vue";

const title = ref();
const selectedTitle = ref();
const content = ref();
const notes = ref([]);

const createNew = () => {
  title.value = null;
  selectedTitle.value = null;
  content.value = null;
}

const refreshNotes = async () => {
  notes.value = await getNoteList();
  if (!selectedTitle.value)
  {
    selectedTitle.value=title.value;
  }
  else if (notes.value.some(note=>note.title===title.value)) {
    selectedTitle.value = title.value;
  } else {
    selectedTitle.value = null;
    title.value = null;
    content.value = null;
  }
}


</script>

<style>
</style>
