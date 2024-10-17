<script>
import SearchBar from "../components/SearchBar.vue"
import FilterBar from "../components/FilterBar.vue"
import PromptList from "../components/PromptList.vue"
import PromptForm from "../components/PromptForm.vue"
import ModalLayer from "../components/ModalLayer.vue"
import { useUsersStore } from "../stores/users.js"
import axios from 'axios'

export default {
  name: "Dashboard",
  components: {
    SearchBar,
    FilterBar,
    PromptList,
    PromptForm,
    ModalLayer
  },
  created() {
    this.loadData()
  },
  setup() {
    const userStore = useUsersStore()
    return { userStore }
  },
  data() {
    return {
      promptList: [],
      tempPrompt: "",
      searchTerm: "",
      sortBy: "title",
      orderBy: "ascending",
      onlyPrivate: false,
      showEditModal: false,
      showModal: false,
      largeModal: "60%"
    }
  },
  methods: {
    async loadData() {
      this.promptList = []
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/prompt/list`, {
          headers: {
            Authorization: `Bearer ${this.userStore.getToken}`
          }
        })
        if (response.data.status === 200) this.promptList = response.data.body
        else alert(`Error! Status code ${response.data.status} while fetching API data. ${response.data.message}.`)
      } catch (error) {
        alert(`${error}. Please retry later.`)
      }
    },
    async addPrompt(prompt) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/prompt/create`,
            JSON.parse(JSON.stringify(prompt)),
            {
              headers: {
                Authorization: `Bearer ${this.userStore.getToken}`
              }
            })
        if (response.data.status === 201) await this.loadData()
        else alert(`Error! Status code ${response.data.status} while uploading data to the API endpoint. ${response.data.message}.`)
      } catch (error) {
        alert(`${error}. Please retry later.`)
      } finally {
        this.toggleForm()
      }
    },
    async editPrompt(promptId) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/prompt/get/${promptId}`, {
          headers: {
            Authorization: `Bearer ${this.userStore.getToken}`
          }
        })
        if (response.data.status === 200) this.tempPrompt = response.data.body
        else alert(`Error! Status code ${response.data.status} while fetching data from the API endpoint. ${response.data.message}.`)
      } catch (error) {
        alert(`${error}. Please retry later.`)
      } finally {
        this.toggleEditForm()
      }
    },
    async updatePrompt(prompt) {
      try {
        const id = prompt._id
        delete prompt._id
        delete prompt.owner
        const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/v1/prompt/update/${id}`,
            JSON.parse(JSON.stringify(prompt)),
            {
              headers: {
                Authorization: `Bearer ${this.userStore.getToken}`
              }
            })
        if (response.data.status === 200) await this.loadData()
        else alert(`Error! Status code ${response.data.status} while updating data from the API endpoint. ${response.data.message}.`)
      } catch (error) {
        alert(`${error}. Please retry later.`)
      } finally {
        this.tempPrompt = ""
        this.toggleEditForm()
      }
    },
    async deletePrompt(promptId) {
      try {
        const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/prompt/delete/${promptId}`, {
          headers: {
            Authorization: `Bearer ${this.userStore.getToken}`
          }
        })
        if (response.data.status === 200) await this.loadData()
        else alert(`Error! Status code ${response.data.status} while deleting data from the API endpoint. ${response.data.message}.`)
      } catch (error) {
        alert(`${error}. Please retry later.`)
      }
    },
    toggleEditForm() {
      this.showEditModal = !this.showEditModal
    },
    toggleForm() {
      this.showModal = !this.showModal
    },
    setSearchTerm(input) {
      this.searchTerm = input.toLowerCase()
    },
    setSortBy(input) {
      this.sortBy = input
    },
    setOrderBy(input) {
      this.orderBy = input
    },
    setOnlyPrivate(input) {
      this.onlyPrivate = input
    },
    applyFilters() {
      let promptList = [...this.promptList]
      switch (this.sortBy) {
        case 'title':
          promptList.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 0)
          break
        case 'prompt':
          promptList.sort((a, b) => a.prompt.toLowerCase() > b.prompt.toLowerCase() ? 1 : a.prompt.toLowerCase() < b.prompt.toLowerCase() ? -1 : 0)
          break
        case 'tag':
          promptList.sort((a, b) => a.tags[0].toLowerCase() > b.tags[0].toLowerCase() ? 1 : a.tags[0].toLowerCase() < b.tags[0].toLowerCase() ? -1 : 0)
          break
        case 'owner':
          promptList.sort((a, b) => a.owner.toLowerCase() > b.owner.toLowerCase() ? 1 : a.owner.toLowerCase() < b.owner.toLowerCase() ? -1 : 0)
          break
      }
      if (this.orderBy === 'descending') promptList.reverse()
      return this.onlyPrivate ? promptList.filter(prompt => prompt.private === this.onlyPrivate && prompt.owner === this.userStore.getName)
          : promptList.filter(prompt => !(prompt.owner !== this.userStore.getName && prompt.private === true))
    }
  },
  computed: {
    promptListFiltered() {
      return this.searchTerm === "" ? this.applyFilters() : this.applyFilters().filter(
          prompt => prompt.title.toLowerCase().includes(this.searchTerm)
              || prompt.prompt.toLowerCase().includes(this.searchTerm)
              || prompt.tags.some(tag => tag.toLowerCase().includes(this.searchTerm))
              || prompt.owner.toLowerCase().includes(this.searchTerm)
      )
    }
  }
}
</script>

<template>
  <search-bar @search="setSearchTerm" @show-form="toggleForm" />
  <filter-bar @sort-prompt="setSortBy" @order-prompt="setOrderBy" @private-prompt="setOnlyPrivate" />
  <prompt-list :prompt-list="promptListFiltered" @edit-prompt="editPrompt" @delete-prompt="deletePrompt" />
  <modal-layer v-if="showModal" :modal-size="largeModal" @close-modal="toggleForm">
    <template #header>
      <h2 class="modal__header">Publish prompt</h2>
    </template>
    <template #body>
      <prompt-form @send-form="addPrompt" />
    </template>
  </modal-layer>
  <modal-layer v-if="showEditModal" :modal-size="largeModal" @close-modal="toggleEditForm">
    <template #header>
      <h2 class="modal__header">Edit prompt</h2>
    </template>
    <template #body>
      <prompt-form :temp-prompt="tempPrompt" @send-form="updatePrompt" />
    </template>
  </modal-layer>
</template>

<style scoped>
.modal__header {
  font-family: "Poetsen One", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>