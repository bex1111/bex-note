<template>
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import MarkdownEditor from './components/MarkdownEditor.vue'

export default {
  name: 'App',
  components: {
    HelloWorld: MarkdownEditor
  }
}
</script>

<style>
</style>
