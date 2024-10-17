<script>
export default {
  name: "FilterBar",
  data() {
    return {
      sortBy: "title",
      orderBy: "ascending",
      isPrivate: false
    }
  },
  emits: ['sortPrompt', 'orderPrompt', 'privatePrompt'],
  watch: {
    sortBy() {
      this.$emit('sortPrompt', this.sortBy)
    },
    orderBy() {
      this.$emit('orderPrompt', this.orderBy)
    },
    isPrivate() {
      this.$emit('privatePrompt', this.isPrivate)
    }
  }
}
</script>

<template>
  <div class="filter-bar">
    <div class="filter-bar__select">
      <label for="sort-by">Sort By</label>
      <select id="sort-by" v-model="sortBy">
        <option value="title">Title</option>
        <option value="prompt">Prompt</option>
        <option value="tag">Tag</option>
        <option value="owner">Owner</option>
      </select>
    </div>
    <div class="filter-bar__select">
      <label for="order-by">Order By</label>
      <select id="order-by" v-model="orderBy">
        <option value="ascending">Ascending</option>
        <option value="descending">Descending</option>
      </select>
    </div>
    <div class="filter-bar__check">
      <input type="checkbox" id="private" v-model="isPrivate">
      <label for="private">Private</label>
    </div>
  </div>
</template>

<style scoped>
.filter-bar {
  font-family: "Poetsen One", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}
.filter-bar__select {
  display: flex;
  align-items: center;
  margin-right: 20px;
}
.filter-bar__select label {
  margin-right: 10px;
}
.filter-bar__select select {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 3px;
  outline: none;
}
.filter-bar__check {
  display: flex;
  align-items: center;
}
.filter-bar__check input {
  margin-right: 10px;
}
.filter-bar__check label {
  cursor: pointer;
}
</style>
