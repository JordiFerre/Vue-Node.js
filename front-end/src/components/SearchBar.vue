<script>
import { useUsersStore } from "../stores/users.js";

export default {
  name: "SearchBar",
  setup() {
    const userStore = useUsersStore()
    return { userStore }
  },
  data() {
    return {
      search: ""
    }
  },
  emits: ['showForm', 'search'],
  methods: {
    showForm() {
      this.$emit('showForm')
    },
    clearSearch() {
      this.search = ""
    },
    toBeImplemented() {
      alert("To be implemented...")
    }
  },
  watch: {
    search() {
      this.$emit('search', this.search.toLowerCase())
    }
  }
}
</script>

<template>
  <div class="search-bar">
    <button class="publish" v-show="userStore.isLogged" @click="showForm">Publish</button>
    <button class="library" v-show="userStore.isLogged" @click="toBeImplemented">Add Library</button>
    <input type="text" placeholder="Search prompt" v-model="search">
    <button class="clear" @click="clearSearch">Clear</button>
  </div>
</template>

<style scoped>
.search-bar {
  font-family: "Poetsen One", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 10px 20px;
  height: 200px;
}
.search-bar input {
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  padding: 10px;
  width: 100%;
  outline: none;
}
.search-bar button {
  margin-right: 10px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  padding: 10px;
  min-width: 115px;
  cursor: pointer;
}
.search-bar .clear {
  margin-left: 15px;
}
.search-bar .publish {
  background-color: #4caf50;
}
.publish:hover {
  color: #ffff00;
}
.search-bar .library {
  background-color: #2c503e;
  color: #fff;
}
.library:hover {
  color: #ffff00;
}
button:hover {
  background-color: #373796;
  color: #ffff00;
  border: 2px solid #373796;
}
button:active {
  background-color: #373796;
  box-shadow: 0 2px #a5a5ff;
  transform: translateY(.1rem);
}
</style>
