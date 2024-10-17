<script>
import { useUsersStore } from "../stores/users.js"

export default {
  name: "Profile",
  setup() {
    const userStore = useUsersStore()
    return { userStore }
  },
  methods: {
    nounNumber(quantity) {
      return quantity === 1 ? '' : 's'
    }
  }
}
</script>

<template>
  <div class="view__profile">
    <div class="profile__info">
      <div class="profile__image">
        <img src="../assets/user-avatar.png" alt="avatar">
      </div>
      <div class="profile__data">
        <span class="profile__name">{{ userStore.getName }}</span>
        <span class="profile__email">{{ userStore.getEmail }}</span>
        <span class="profile__period">{{ `joined ${userStore.getMembershipPeriod} day${nounNumber(userStore.getMembershipPeriod)} ago` }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.view__profile {
  background: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.4), rgba(153, 153, 153, 1)), url("../assets/tropical-background.jpg");
  font-family: "Poetsen One", sans-serif;
  width: 100%;
}
.profile__info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.profile__image {
  margin: 150px 50px 0 0;
  border-radius: 50%;
  border: 5px solid #2c503e;
  width: 200px;
  height: 200px;
  overflow: hidden;
}
.profile__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.profile__data {
  background: linear-gradient(rgba(249, 228, 188, 1), rgba(255, 255, 255, 0.5));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 100px;
  border: 2px solid #ccb40a;
  border-radius: 10px;
  padding: 80px 100px;
  opacity: 0.8;
}
.profile__name {
  font-size: 2rem;
  font-weight: bold;
  padding-bottom: 15px;
}
.profile__email,
.profile__period {
  font-size: 1.5rem;
  padding-bottom: 10px;
}
</style>
