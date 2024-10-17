<script>
import { useUsersStore } from "../stores/users.js"

export default {
  name: "PromptForm",
  props: ['tempPrompt'],
  created() {
    this.init()
  },
  setup() {
    const userStore = useUsersStore()
    return { userStore }
  },
  data() {
    return {
      prompt: {
        title: "",
        prompt: "",
        tags: "",
        private: false,
        owner: ""
      },
      hasErrors: false
    }
  },
  emits: ['sendForm'],
  methods: {
    formHandler() {
      if (this.prompt.title !== "" && this.prompt.prompt !== "" && this.prompt.tags) {
        if (!Array.isArray(this.prompt.tags)) this.prompt.tags = this.prompt.tags.split(",").map(tag => tag.trim())
        this.prompt.owner = this.userStore.getName
        this.$emit('sendForm', this.prompt)
        this.clearForm()
      } else this.hasErrors = true
    },
    clearForm() {
      this.hasErrors = false
      delete this.prompt._id
      this.prompt.title = ""
      this.prompt.prompt = ""
      this.prompt.tags = ""
      this.prompt.private = false
      this.prompt.owner = ""
    },
    init() {
      if (this.tempPrompt) {
        this.prompt._id = this.tempPrompt._id
        this.prompt.title = this.tempPrompt.title
        this.prompt.prompt = this.tempPrompt.prompt
        this.prompt.tags = this.tempPrompt.tags
        this.prompt.private = this.tempPrompt.private
      }
    }
  }
}
</script>

<template>
  <div class="form">
    <form id="addPrompt" @submit.prevent="formHandler">
      <div class="form__group">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="prompt.title">
      </div>
      <div class="form__group">
        <label for="prompt">Prompt</label>
        <textarea id="prompt" v-model="prompt.prompt" />
      </div>
      <div class="form__group-row">
        <div class="form__group">
          <label for="tags">Tags</label>
          <input type="text" id="tags" placeholder="Separated by commas." multiple v-model="prompt.tags">
        </div>
        <div class="form__group">
          <label for="private-form">Private</label>
          <input type="checkbox" id="private-form" v-model="prompt.private">
        </div>
      </div>
    </form>
    <div class="form__actions">
      <button class="clear" @click="clearForm">Clear</button>
      <button type="submit" form="addPrompt" class="submit">Submit</button>
    </div>
    <span v-show="hasErrors" class="error">
      Kindly fill the title, prompt and tags fields as these are mandatory.
    </span>
  </div>
</template>

<style scoped>
.form {
  display: block;
  text-align: center;
  margin: 0 auto;
  width: 70%;
}
.form__group {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}
.form__group-row {
  display: grid;
  grid-template-columns: 3fr 1fr;
  margin: 0 auto;
  width: 90%;
}
.form__group label, span {
  font-family: "Poetsen One", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 10px;
}
.form__group input,
.form__group select,
.form__group textarea {
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  padding: 10px;
  width: 80%;
  resize: none;
  outline: none;
}
.form__group input:focus,
.form__group textarea:focus {
  border-color: #000;
}
.form__group textarea {
  height: 100px;
}
.form__actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
}
.submit, .clear {
  margin-bottom: 10px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  padding: 10px;
  outline: none;
  cursor: pointer;
}
.submit {
  background-color: #4caf50;
  color: #fff;
}
.submit:hover {
  background-color: #43a047;
}
.clear:hover {
  background-color: #ddd;
}
.submit:active, .clear:active {
  box-shadow: 0 2px #50312c;
  transform: translateY(.1rem);
}
.error {
  font-weight: bold;
  color: red;
  padding: 10px;
}
</style>
