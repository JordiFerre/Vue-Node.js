<script>
export default {
  name: "ModalLayer",
  props: ['modalSize'],
  emits: ['closeModal'],
  methods: {
    closeModal() {
      this.$emit('closeModal')
    }
  },
  computed: {
    cssStyle() {
      return {
        '--size': this.modalSize,
        '--min': this.modalSize === '40%' ? '370px' : '530px'
      }
    }
  }
}
</script>

<template>
  <div class="modal">
    <div class="modal__overlay" />
    <div class="modal__content" :style="cssStyle">
      <div class="modal__header">
        <slot name="header"></slot>
        <button class="modal__close" @click="closeModal">
          <img src="../assets/close-button.svg" alt="close">
        </button>
      </div>
      <div class="modal__body">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
}
.modal__overlay {
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.modal__content {
  background-color: #fff;
  position: absolute;
  border-radius: 4px;
  padding: 20px;
  width: var(--size);
  height: var(--size);
  min-height: var(--min);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
}
.modal__header {
  margin-bottom: 50px;
  display: block;
  text-align: center;
}
.modal__close {
  background-color: transparent;
  position: absolute;
  border: none;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
}
.modal__close img {
  width: 20px;
}
.modal__body {
  display: grid;
}
</style>
