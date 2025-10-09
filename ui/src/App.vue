<template>
  <ActionsHeader></ActionsHeader>
  <MarkdownEditor/>
</template>

<script>
import MarkdownEditor from './components/MarkdownEditor.vue'
import ActionsHeader from "@/components/ActionsHeader.vue";

export default {
  name: 'App',
  components: {
    ActionsHeader,
    MarkdownEditor
  }
}
</script>

<style>
</style>
