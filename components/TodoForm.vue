<template>
  <div class="todo-form-container">
    <input
      v-model="todoTitle"
      class="input-title text"
      type="text"
      placeholder="Task"
      autofocus
      @keyup="handleSubmit"
    >
    <button
      class="submit-btn"
      @click="handleSubmit"
    >
      +
    </button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      todoTitle: ''
    }
  },
  methods: {
    handleSubmit (e) {
      if (e.type === 'click' || e.keyCode === 13) {
        const titleText = this.todoTitle.trim()
        if (titleText.length > 0) {
          const tomorrow = new Date()
          tomorrow.setHours(23, 59, 59, 999)
          tomorrow.setDate(tomorrow.getDate() + 1)
          this.$emit('submit-todo', {
            title: titleText,
            due: tomorrow
          })
          this.todoTitle = ''
        }
      }
    }
  }
}
</script>

<style scoped>
.todo-form-container {
  display: flex;
  align-items: center;
  padding: 8px 12px;
}
.text {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  letter-spacing: 1px;
}
.input-title {
  flex-grow: 1;
  outline: none;
  border: none;
  font-size: 24px;
}
.submit-btn {
  border: none;
  outline: none;
  border-radius: 50%;
  background-color: #424242;
  color: #FFF;
  width: 28px;
  height: 28px;
  cursor: pointer;
  opacity: 0.9;
}
.submit-btn:hover {
  opacity: 1.0;
}
</style>
