<template>
  <MdEditor v-model="content"
            language="en-Us"
            :toolbars="toolbar"
  />
</template>

<script setup>
import {MdEditor} from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import {toRef, watch} from "vue";
import {getContent} from "../api/bex-note";

const props = defineProps({
  title: String
})
const selectedTitleRef = toRef(props, 'title');
const content = defineModel()

watch(selectedTitleRef, async (newVal) => {
  if (newVal) {
    let newContent = await getContent(props.title);
    content.value = newContent.content;
  }
})


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
