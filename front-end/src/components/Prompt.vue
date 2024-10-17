<script>
import { reactive } from "vue"
import { useUsersStore } from "../stores/users.js"

export default {
  name: "Prompt",
  props: ['prompt'],
  setup() {
    const userStore = useUsersStore()
    return { userStore }
  },
  data() {
    return {
      likes: reactive({
        count: 0,
        increment() {
          this.count++
        }
      })
    }
  },
  emits: ['editPrompt', 'deletePrompt'],
  methods: {
    editPrompt(id) {
      this.$emit('editPrompt', id)
    },
    deletePrompt(id) {
      this.$emit('deletePrompt', id)
    },
    toBeImplemented() {
      alert("To be implemented...")
    }
  }
}
</script>

<template>
  <div class="prompt">
    <div class="prompt__group">
      <h2 class="prompt__title">{{ `${prompt.title.substring(0, 15)} ${prompt.title.length > 15 ? '...' : ''}` }}</h2>
    </div>
    <div class="prompt__group">
      <div class="prompt__prompt">
        <span>{{ `${prompt.prompt.substring(0, 40)} ${prompt.prompt.length > 40 ? '...' : ''}` }}</span>
      </div>
    </div>
    <div class="prompt__group">
      <div class="prompt__tags">
        <span class="prompt__tag" v-for="tag in prompt.tags">{{ tag.toUpperCase() }}</span>
      </div>
    </div>
    <div class="prompt__group">
      <div class="prompt__reaction">
        <button class="like" @click="likes.increment()">
          <img src="../assets/like-icon.svg" alt="like">
        </button>
        <span>{{ likes.count }}</span>
      </div>
    </div>
    <div class="prompt__group">
      <div class="prompt__by">
        <span class="prompt__by-label">owner</span>
        <span class="prompt__by-value">{{ prompt.owner }}</span>
      </div>
    </div>
    <div class="prompt__group">
      <div class="prompt__actions">
        <button @click="toBeImplemented">Share</button>
        <button @click="toBeImplemented">Execute</button>
      </div>
    </div>
    <button class="lock" v-show="prompt.private">
      <img src="../assets/lock-icon.svg" alt="private"/>
    </button>
    <button class="edit" v-show="userStore.getName === prompt.owner" @click="editPrompt(prompt._id)">
      <img src="../assets/edit-icon.svg" alt="edit"/>
    </button>
    <button class="delete" v-show="userStore.getName === prompt.owner" @click="deletePrompt(prompt._id)">
      <img src="../assets/delete-icon.svg" alt="delete"/>
    </button>
  </div>
</template>

<style scoped>

.prompt {
  background-color: #fff;
  font-family: "Poetsen One", sans-serif;
  position: relative;
  display: grid;
  grid-template-columns: 2fr 3fr 2fr 1fr 1fr 2fr;
  align-items: center;
  justify-content: start;
  margin: 0 15px;
  border-radius: 1rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  padding: 1rem;
  min-width: 700px;
  max-width: 100%;
  transition: all 0.3s ease;
  overflow: hidden;
}
.prompt:first-child {
  margin-top: 15px;
}
.prompt:last-child {
  margin-bottom: 15px;
}
.prompt__group {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
}
.prompt__title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #333;
  text-decoration: none;
}
.prompt__prompt {
  font-size: 1rem;
  font-weight: 400;
}
.prompt__tags {
  display: flex;
  align-items: center;
  justify-content: center;
}
.prompt__tag {
  background-color: #135;
  font-size: 0.75rem;
  color: #fff;
  margin-right: 0.5rem;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  text-transform: uppercase;
}
.prompt__reaction {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.prompt__reaction img {
  margin-right: 10px;
  width: 30px;
}
.like {
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
}
.prompt__by {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.prompt__by-label {
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
}
.prompt__by-value {
  font-size: 1rem;
  font-weight: 700;
}
.prompt__actions button {
  margin-right: 10px;
  border: 1px solid #000;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
}
.prompt__actions button:hover {
  background-color: #2c503e;
  color: #ffe055;
  border: 1px solid #2c503e;
}
.prompt__actions button:active {
  background-color: #2c503e;
  box-shadow: 0 1px #50312c;
  transform: translateY(.1rem);
}
.lock {
  background: transparent;
  position: absolute;
  border: 0;
  padding: 0;
  top: 10px;
  left: 10px;
}
.lock img {
  width: 20px;
}
.edit {
  background: transparent;
  position: absolute;
  border: 0;
  padding: 0;
  top: 10px;
  right: 40px;
  cursor: pointer;
}
.edit img {
  width: 19px;
}
.delete {
  background: transparent;
  position: absolute;
  border: 0;
  padding: 0;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
.delete img {
  width: 20px;
}
</style>
