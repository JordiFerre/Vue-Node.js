<script>
import Prompt from "./Prompt.vue";

export default {
  name: "PromptList",
  components: {
    Prompt
  },
  props: ['promptList'],
  emits: ['editPrompt', 'deletePrompt'],
  methods: {
    editPrompt(id) {
      this.$emit('editPrompt', id)
    },
    deletePrompt(id) {
      this.$emit('deletePrompt', id)
    }
  }
}
</script>

<template>
  <div class="prompt-list">
    <prompt v-for="prompt in promptList" :prompt="prompt" :key="prompt._id" @edit-prompt="editPrompt" @delete-prompt="deletePrompt" />
  </div>
</template>

<style scoped>
.prompt-list {
  background-color: #ccc;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
  margin: 20px 50px;
  border: 2px solid #222;
  border-radius: 10px;
  min-width: 750px;
}
</style>
