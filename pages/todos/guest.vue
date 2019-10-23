<template>
  <div class="todo-base">
    <div class="todo-form-container">
      <todo-form @submit-todo="addItem" />
    </div>
    <div class="splitter" />
    <div class="todo-list-container">
      <todo-item
        v-for="(todo, i) in todos"
        :key="todo.id"
        :title="todo.title"
        :due="todo.due"
        :done="todo.done"
        :fold="i !== unfold"
        @toggle="toggleItem({ todo })"
        @toggle-fold="toggleFold(i)"
        @remove="removeItem(todo)"
        @edit="e => editItem(todo, e)"
      />
    </div>
    <div class="splitter" />
    <nuxt-link to="/" class="btn contained notice">
      home
    </nuxt-link>
  </div>
</template>

<script>
import TodoItem from '~/components/TodoItem'
import TodoForm from '~/components/TodoForm'

export default {
  components: {
    TodoItem,
    TodoForm
  },
  data () {
    return {
      unfold: -1
    }
  },
  computed: {
    todos () {
      const todoList = this.$store.state.todos.list.slice()
      todoList.sort((a, b) => a.due - b.due)
      return todoList
    }
  },
  fetch ({ store }) {
    store.dispatch('todos/guestFetch')
  },
  methods: {
    toggleFold (i) {
      let unfoldIndex = -1
      if (i !== this.unfold) {
        unfoldIndex = i
      }
      this.unfold = unfoldIndex
    },
    removeItem (todo) {
      this.$store.dispatch('todos/guestRemove', { todo })
      this.unfold = -1
    },
    addItem (e) {
      this.$store.dispatch('todos/guestAdd', e)
    },
    editItem (todo, e) {
      this.$store.dispatch('todos/guestEdit', {
        todo,
        ...e
      })
      this.unfold = -1
    },
    toggleItem (e) {
      this.$store.dispatch('todos/guestToggle', e)
    }
  }
}
</script>

<style scoped>
.todo-base {
  margin: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(#070B34, #855988);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.todo-base * {
  width: 100%;
  max-width: 600px;
  background-color: #FFF;
  opacity: 0.85;
}
.todo-list-container {
  padding: 0px 1px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, .2);
  display: flex;
  flex-direction: column;
}
.splitter {
  height: 20px;
  background: none;
}
</style>
