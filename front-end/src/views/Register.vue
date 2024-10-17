<script>
import { useUsersStore } from "../stores/users.js"
import axios from 'axios'

export default {
  name: "Register",
  setup() {
    const userStore = useUsersStore()
    return { userStore }
  },
  data() {
    return {
      user: {
        name: "",
        lastName: "",
        email: "",
        password: ""
      },
      hasErrors: false
    }
  },
  methods: {
    async signIn(user) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/register`, user)
        if (response.data.status === 201) {
          alert(response.data.message)
        } else alert(`Error! Status code ${response.data.status} while registering. ${response.data.message}.`)
      } catch (error) {
        alert(`${error}. Please retry later.`)
      } finally {
        this.clearForm()
      }
    },
    handler() {
      if (this.user.name !== "" && this.user.lastName !== "" && this.user.email !== "" && this.user.password !== "") {
        this.signIn(this.user)
      } else this.hasErrors = true
    },
    clearForm() {
      this.hasErrors = false
      this.user.name = ""
      this.user.lastName = ""
      this.user.email = ""
      this.user.password = ""
    }
  }
}
</script>

<template>
  <div class="view__register">
    <h1>Register</h1><hr>
    <form id="sign-in" @submit.prevent="handler">
      <div class="register__group">
        <label for="first-name">First name:</label>
        <input type="text" id="first-name" minlength="2" maxlength="10" v-model="user.name">
      </div>
      <div class="register__group">
        <label for="last-name">Last name:</label>
        <input type="text" id="last-name" minlength="2" maxlength="10" v-model="user.lastName">
      </div>
      <div class="register__group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="user.email">
      </div>
      <div class="register__group">
        <label for="password">Password:</label>
        <input type="password" id="password" minlength="5" maxlength="15" v-model="user.password">
      </div>
    </form>
    <div class="register__actions">
      <button type="submit" form="sign-in" class="submit">Submit</button>
    </div>
    <span v-show="hasErrors" class="error">
      Kindly fill all the fields as these are mandatory.
    </span>
  </div>
</template>

<style scoped>
.view__register {
  background: linear-gradient(rgba(249, 228, 188, 1), rgba(249, 228, 188, 0.8), rgba(255, 255, 255, 1));
  font-family: "Poetsen One", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1rem;
  font-weight: bold;
  display: block;
  text-align: center;
  margin: 150px auto;
  border: 2px solid #ccb40a;
  border-radius: 10px;
  padding: 30px;
  width: 50%;
}
.view__register h1 {
  font-size: 2rem;
  margin-bottom: 30px;
}
.view__register hr {
  margin-bottom: 30px;
}
.register__group {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}
.register__group label {
  margin-bottom: 10px;
}
.register__group input,
.register__group select,
.register__group textarea {
  padding: 10px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  width: 40%;
  resize: none;
  outline: none;
}
.register__group input:focus {
  border-color: #000;
}
.register__actions {
  display: block;
  justify-items: center;
  align-items: center;
  text-align: center;
  margin: 30px;
}
.register__actions button {
  align-items: center;
  justify-items: center;
  margin: 0 auto;
  width: 30%;
}
.submit {
  margin-bottom: 10px;
  border: 1px solid #ccc;
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
.submit:active {
  box-shadow: 0 2px #50312c;
  transform: translateY(.1rem);
}
.error {
  font-weight: bold;
  color: red;
  padding: 10px;
}
</style>