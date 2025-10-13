<template>
  <prime-card>
    <template #title>
      <ActionsHeader/>
    </template>
    <template #subtitle>
      <TitleHandler></TitleHandler>
    </template>
    <template #content>
      <MarkdownEditor></MarkdownEditor>
    </template>
  </prime-card>
  <LoginModal></LoginModal>
  <span class="text-2xl font-medium">Class Warfare</span>
</template>

<script setup>

import MarkdownEditor from "./components/MarkdownEditor.vue";
import ActionsHeader from "./components/ActionsHeader.vue";
import TitleHandler from "./components/TitleHandler.vue";
import LoginModal from "./components/LoginModal.vue";
</script>

<style>
</style>
