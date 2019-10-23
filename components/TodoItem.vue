<template>
  <div class="todo-item-container">
    <div class="todo-item-abstract" @click="toggleFold">
      <div
        class="todo-item-checkbox"
        :class="[done? 'checked' : '']"
        @click.stop="toggle"
      />
      <div
        class="todo-text todo-title"
        :class="[done? 'delete' : '']"
      >
        {{ title }}
      </div>
      <div
        class="todo-text todo-deadline"
        :class="[overDue? 'danger' : done? 'delete' : '']"
        title="due date"
      >
        {{ deadline }}
      </div>
    </div>
    <div
      class="todo-item-detail"
      :class="[fold? '' : 'unfold']"
    >
      <todoitem-detail
        :title="title"
        :due="due"
        :done="done"
        :fold="fold"
        @remove="$emit('remove')"
        @edit="(e) => $emit('edit', e)"
      />
    </div>
  </div>
</template>

<script>
import TodoitemDetail from '~/components/TodoItemDetail'

export default {
  components: {
    TodoitemDetail
  },
  props: {
    title: {
      type: String,
      default: 'todo title'
    },
    due: {
      type: Date,
      default: new Date()
    },
    done: {
      type: Boolean,
      default: false
    },
    fold: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    deadline () {
      return `${this.due.getFullYear()}/${this.due.getMonth() + 1}/${this.due.getDate()}`
    },
    overDue () {
      return !this.done && this.due < new Date()
    }
  },
  methods: {
    toggle () {
      this.$emit('toggle')
    },
    toggleFold () {
      this.$emit('toggle-fold')
    }
  }
}
</script>

<style scoped>
.todo-item-container {
  display: flex;
  flex-direction: column;
  margin: 4px 0px;
}
.todo-item-container:hover {
  box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, .2);
}
.todo-item-abstract {
  padding: 8px;
  display: flex;
  align-items: baseline;
}
.todo-item-detail {
  height: 0;
  max-height: 0;
  transition-property: max-height;
  transition-duration: 0.5s;
  transition-timing-function: ease-in;
  overflow: hidden;
}
.todo-item-detail.unfold {
  height: auto;
  max-height: 500px;
}
.todo-text {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  letter-spacing: 1px;
}
.todo-text.delete {
  text-decoration: line-through;
}
.todo-text.danger {
  color: #f50057;
}
.todo-title {
  font-size: 24px;
  color: #35495e;
  flex-grow: 1;
  cursor: pointer;
}
.todo-deadline {
  font-size: 20px;
  color: #424242;
  cursor: default;
}
.todo-item-checkbox {
  border-width: 2px;
  border-style: solid;
  border-color: #35495e;
  width: 18px;
  height: 18px;
  margin: auto 12px 4px 0px;
}
.todo-item-checkbox.checked {
  background: #35495e;
}
</style>
