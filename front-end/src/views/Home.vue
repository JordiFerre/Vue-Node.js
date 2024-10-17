<script>
import HeaderBar from "../components/HeaderBar.vue"
import LoginForm from "../components/LoginForm.vue"
import ModalLayer from "../components/ModalLayer.vue"
import { useUsersStore } from "../stores/users.js"
import axios from 'axios'

export default {
  name: "Home",
  components: {
    HeaderBar,
    LoginForm,
    ModalLayer
  },
  setup() {
    const userStore = useUsersStore()
    return { userStore }
  },
  data() {
    return {
      showLogInModal: false,
      smallModal: "40%"
    }
  },
  methods: {
    async logIn(user) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/login`, user)
        if (response.data.status === 200) {
          await this.userStore.setUserData(response.data)
          this.$router.push('/dashboard')
        } else alert(`Error! Status code ${response.data.status} while logging in. ${response.data.message}.`)
      } catch (error) {
        alert(`${error}. Please retry later.`)
      } finally {
        this.toggleLogInForm()
      }
    },
    logOut() {
      this.userStore.clearUserData()
      this.$router.push('/')
    },
    toggleLogInForm() {
      this.showLogInModal = !this.showLogInModal
    }
  }
}
</script>

<template>
  <section>
    <header-bar @show-log-in-form="toggleLogInForm" @log-out="logOut" />
  </section>
  <section>
    <modal-layer v-if="showLogInModal" :modal-size="smallModal" @close-modal="toggleLogInForm">
      <template #header>
        <h2 class="modal__header">Login</h2>
      </template>
      <template #body>
        <login-form v-on="{ login: logIn, closeModal: toggleLogInForm }" />
      </template>
    </modal-layer>
    <router-view />
  </section>
</template>

<style scoped>
.modal__header {
  font-family: "Poetsen One", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
