<script>
export default {
  name: "Description"
}
</script>

<template>
  <div class="view__description">
    <div class="description__logo">
      <img src="../assets/logo.png" alt="logo">
    </div>
    <div class="description__group">
      <p>AI is the industrial revolution of yesterday. Once it began, it kept spreading all over the world to make possible, what once was known as impossible.</p>
      <p>Now you can embrace AI by sharing the most useful prompts. Whether you would like to reduce bias or empower inclusion, shape AI response nature by leveraging already tested prompts.</p>
      <p>Additionally, classifying these prompts by categories using tags, enable like-minded users to focus on their tasks at hand and further leverage AI features without the need to become an expert on such a field.</p>
    </div>
  </div>
</template>

<style scoped>
.view__description {
  background: linear-gradient(rgba(153, 153, 153, 1), rgba(153, 153, 153, 0.1), rgba(153, 153, 153, 1)), url("../assets/background.jpg") no-repeat center center;
  background-size: cover;
  font-family: "Poetsen One", sans-serif;
  font-size: 1.5rem;
  margin-top: 80px;
  width: 100%;
}
.description__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 200px 0 100px 0;
}
.description__logo img {
  border: 5px solid #2c503e;
  border-radius: 5px;
  min-height: 100px;
  max-height: 150px;
}
.description__group {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
  width: 40%;
}
</style>