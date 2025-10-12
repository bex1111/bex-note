<template>
  <prime-card>
    <template #title>
      <ActionsHeader @selectFile="selectFile"/>
    </template>
    <template #subtitle>
      <prime-float-label variant="in">
        <label for="in_label">Folder/Filename, Filename</label>
        <prime-input id="in_label" v-model="selectedFile" type="text" fluid/>
      </prime-float-label>
    </template>
    <template #content>
      <MdEditor v-model="text"
                language="en-Us"
                :toolbars="toolbar"
      />
    </template>
  </prime-card>
</template>

<script setup>
import {ref} from 'vue';
import {MdEditor} from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import ActionsHeader from './ActionsHeader.vue';

const selectedFile = ref(null);

const selectFile = (filename) => {
  selectedFile.value = filename;
}

const text = ref('Hello Editor!');
const toolbar = [
  'revoke',
  'next',
  '-',
  'bold',
  'underline',
  'italic',
  '-',
  'title',
  'strikeThrough',
  'sub',
  'sup',
  'quote',
  'unorderedList',
  'orderedList',
  'task',
  '-',
  'codeRow',
  'code',
  'link',
  'table',
  '-',
  'pageFullscreen',
  'fullscreen',
  'preview',
  'previewOnly'
];
</script>

<style scoped>
</style>
