<template>
  <div class="detail-container">
    <div class="detail-info">
      <p class="text">
        Task: {{ editting ? '' : title }}
      </p>
      <input
        v-if="editting"
        v-model="editTitle"
        class="text input"
        type="text"
      >
    </div>
    <div class="detail-info">
      <p class="text">
        Due: {{ editting ? '' : dueDate }}
      </p>
      <input v-if="editting" v-model="editDue" class="text input" type="text">
    </div>
    <p class="text" :class="[overDue? 'danger' : '']">
      Status: {{ status }}
    </p>
    <div
      v-if="!editting"
      class="edit icon-btn"
      @click.stop="handleStartEdit"
    >
      <img src="~/assets/edit.svg" alt="">
    </div>
    <div
      v-if="!editting"
      class="delete icon-btn"
      @click.stop="$emit('remove')"
    >
      <img src="~/assets/delete.svg" alt="">
    </div>
    <button
      v-if="editting"
      class="ok btn"
      @click.stop="handleSubmitEdit"
    >
      OK
    </button>
    <button
      v-if="editting"
      class="cancel btn"
      @click.stop="handleCancelEdit"
    >
      cancel
    </button>
  </div>
</template>

<script>
export default {
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
      default: false
    }
  },
  data () {
    return {
      editting: false,
      editTitle: '',
      editDue: null
    }
  },
  computed: {
    dueDate () {
      return `${this.due.getFullYear()}/${this.due.getMonth() + 1}/${this.due.getDate()}`
    },
    overDue () {
      return !this.done && this.due < new Date()
    },
    status () {
      return this.overDue ? 'overdue' : this.done ? 'done' : 'open'
    }
  },
  watch: {
    fold (val) {
      if (this.fold) {
        this.handleCancelEdit()
      }
    }
  },
  methods: {
    handleStartEdit () {
      this.editTitle = this.title
      this.editDue = this.dueDate
      this.editting = true
    },
    handleSubmitEdit () {
      const titleText = this.editTitle.trim()
      const dueText = this.editDue.trim()
      if (titleText.length < 1) {
        return
      }
      if (!dueText.match(/^\d{4}\/\d{2}\/\d{2}$/)) {
        return
      }

      const dueDateObject = new Date(dueText)
      dueDateObject.setHours(23, 59, 59, 999)

      this.$emit('edit', {
        title: titleText,
        due: dueDateObject
      })

      this.editting = false
    },
    handleCancelEdit () {
      this.editTitle = ''
      this.editDue = ''
      this.editting = false
    }
  }
}
</script>

<style scoped>
.text {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  letter-spacing: 1px;
}
.text.danger {
  color: #f50057;
}
.detail-container {
  background-color: #FFF;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, .2);
  padding: 8px;
  position: relative;
  display: flex;
  flex-direction: column;
}
.detail-info {
  display: flex;
  margin: 4px 0px;
}
.icon-btn {
  width: 28px;
  height: 28px;
  position: absolute;
  cursor: pointer;
}
.icon-btn > img {
  width: 100%;
}
.edit.icon-btn {
  bottom: 8px;
  right: 40px;
}
.delete.icon-btn {
  bottom: 8px;
  right: 8px;
}
.icon-btn:hover {
  transform: scale(1.1)
}
.input {
  outline: none;
  border: none;
  border-bottom: solid 1px #424242;
  flex-grow: 1;
  margin: 0px 4px;
}
.btn {
  border: none;
  background-color: #424242;
  color: #FFF;
  font-size: 16px;
  position: absolute;
  padding: 2px 4px;
}
.ok.btn {
  bottom: 8px;
  right: 8px;
}
.cancel.btn {
  bottom: 8px;
  right: 48px;
}
.hidden {
  display: none;
}
</style>
