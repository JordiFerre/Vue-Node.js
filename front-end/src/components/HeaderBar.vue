<script>
import { useUsersStore } from "../stores/users.js"

export default {
  name: "HeaderBar",
  setup() {
    const userStore = useUsersStore()
    return { userStore }
  },
  emits: ['showLogInForm', 'logOut'],
  methods: {
    logIn() {
      this.$emit('showLogInForm')
    },
    logOut() {
      this.$emit('logOut')
    }
  }
}
</script>

<template>
  <header class="header">
    <div class="header__item">
      <router-link to="/">
        <img class="logo" src="../assets/logo.png" alt="logo" />
      </router-link>
    </div>
    <div id="nav-menu" class="header__item" v-show="userStore.isLogged">
      <router-link to="/">
        <span>Home</span>
      </router-link>
      <span> | </span>
      <router-link to="/dashboard">
        <span>Dashboard</span>
      </router-link>
      <span> | </span>
      <router-link to="/profile">
        <span>Profile</span>
      </router-link>
    </div>
    <div class="header__item">
      <router-link to="/profile">
        <span class="user">{{ userStore.getName }}</span>
      </router-link>
      <button v-if="!userStore.isLogged" class="sign-in-button" @click="this.$router.push('/register')">Sign in</button>
      <button v-if="!userStore.isLogged" class="login-button" @click="logIn">Log in</button>
      <button v-else class="logout-button" @click="logOut">Log out</button>
    </div>
  </header>
</template>

<style scoped>
.header {
  background: #282430;
  border-bottom: 2px solid #ccc;
  padding: 0 10px;
  top: 0;
  width: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 999;
}
.header__item {
  font-family: "Poetsen One", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #fff;
  display: flex;
  align-items: center;
  margin: 0 20px;
}
.header .logo {
  min-width: 200px;
  max-height: 80px;
}
.header .user {
  font-family: Pacifico, "Segoe UI", sans-serif;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: #000;
  display: flex;
}
.header .sign-in-button {
  background: #133;
  color: #fff;
  margin-left: 15px;
  border: 1px solid #000;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
}
.sign-in-button:hover {
  color: #ffe055;
  border: 2px solid #2c503e;
}
.sign-in-button:active {
  box-shadow: 0 2px #50312c;
  transform: translateY(.1rem);
}
.header .login-button,
.header .logout-button {
  background: #135;
  margin-left: 15px;
  border: 1px solid #000;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
}
.login-button:hover, .logout-button:hover {
  color: #ffe055;
  border: 2px solid #2c503e;
}
.login-button:active, .logout-button:active {
  box-shadow: 0 2px #50312c;
  transform: translateY(.1rem);
}
a {
  all: inherit;
  cursor: pointer;
}
a:hover {
  color: #af4e4c;
}
</style>
