<template>
      <MdEditor v-model="text"
                language="en-Us"
                :toolbars="toolbar"
      />
  </template>

<script setup>
import {ref} from 'vue';
import {MdEditor} from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

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
