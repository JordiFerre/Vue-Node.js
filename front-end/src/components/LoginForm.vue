<script>
export default {
  name: "LoginForm",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      hasErrors: false
    }
  },
  emits: ['login', 'closeModal'],
  methods: {
    login() {
      if (this.user.email !== "" && this.user.password !== "") {
        this.$emit('login', this.user)
        this.clearForm()
      } else this.hasErrors = true
    },
    clearForm() {
      this.hasErrors = false
      this.user.email = ""
      this.user.password = ""
    },
    closeModal() {
      this.$emit('closeModal')
    }
  }
}
</script>

<template>
  <div class="form">
    <form id="login" @submit.prevent="login">
      <div class="form__group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="user.email">
      </div>
      <div class="form__group">
        <label for="password">Password</label>
        <input type="password" id="password" minlength="5" maxlength="15" v-model="user.password">
      </div>
      <div class="form__group">
        <button type="submit" form="login" class="submit">Login</button>
        <span v-if="hasErrors" class="error">
          Kindly fill all the fields as they are mandatory.
        </span>
        <span v-else>Not a member yet? <router-link to="/register" @click="closeModal">Register</router-link> now!</span>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form {
  font-family: "Poetsen One", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
}
.form__group {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 20px;
  width: 100%;
}
.form__group label {
  display: block;
  margin-bottom: 10px;
}
.form__group input {
  margin: auto;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  padding: 10px;
  width: 100%;
  outline: none;
  text-align: left;
}
.form__group input:focus {
  border-color: #000;
}
.submit {
  background-color: #4caf50;
  color: #fff;
  margin: auto auto 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  width: 150px;
  cursor: pointer;
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
