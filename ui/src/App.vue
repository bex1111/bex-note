<template>
  <prime-card>
    <template #title>
      <ActionsHeader
          :selectedTitle="selectedTitle"
          :title="title"
          :content="content"
          @createNew="createNew"
      />
    </template>
    <template #subtitle>
      <TitleSelector v-model="selectedTitle"/>
      <TitleEditor v-model="title" :selected-title="selectedTitle"/>
    </template>
    <template #content>
      <MarkdownEditor v-model="content" :title="selectedTitle"></MarkdownEditor>
    </template>
  </prime-card>
  <LoginModal></LoginModal>
</template>

<script setup>

import MarkdownEditor from "./components/MarkdownEditor.vue";
import ActionsHeader from "./components/ActionsHeader.vue";
import TitleEditor from "./components/TitleEditor.vue";
import LoginModal from "./components/LoginModal.vue";
import TitleSelector from "./components/TitleSelector.vue";
import {ref} from "vue";

const title = ref();
const selectedTitle = ref();
const content = ref();

const createNew = () => {
  title.value = '';
  selectedTitle.value = '';
  content.value = '';
}
</script>

<style>
</style>
