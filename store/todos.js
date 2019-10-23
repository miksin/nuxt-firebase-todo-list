import { fireDb, fireAuth } from '~/plugins/firebase'

const collectionName = 'todos'

export const state = () => ({
  list: [],
  incrementId: 1
})

export const mutations = {
  add (state, { id, title, due }) {
    state.list.push({
      id,
      title,
      due,
      done: false
    })
  },
  edit (state, { todo, title, due }) {
    todo.title = title
    todo.due = due
  },
  remove (state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle (state, { todo }) {
    todo.done = !todo.done
  },
  set (state, { todos }) {
    state.list = todos
  },
  idInc (state) {
    state.incrementId += 1
  }
}

export const actions = {
  async fetchFromDb ({ commit }) {
    const collectionRef = fireDb.collection('todos')
    try {
      const todos = []
      const snapshots = await collectionRef.where('uid', '==', fireAuth.currentUser.uid).get()
      snapshots.forEach((doc) => {
        const docData = doc.data()
        todos.push({
          ...docData,
          id: doc.id,
          due: new Date(docData.due.toMillis())
        })
      })
      commit('set', { todos })
    } catch (error) {
      this.$toast.error(error)
    }
  },
  async add ({ commit }, { title, due }) {
    try {
      const addRef = await fireDb.collection(collectionName).add({
        title,
        due,
        done: false,
        uid: fireAuth.currentUser.uid
      })
      commit('add', {
        id: addRef.id,
        title,
        due
      })
      this.$toast.show('A new task has been created')
    } catch (error) {
      this.$toast.error(error)
    }
  },
  async toggle ({ commit }, { todo }) {
    try {
      await fireDb.collection(collectionName).doc(todo.id).set({
        done: !todo.done
      }, { merge: true })
      commit('toggle', { todo })
    } catch (error) {
      this.$toast.error(error)
    }
  },
  async edit ({ commit }, { todo, title, due }) {
    try {
      await fireDb.collection(collectionName).doc(todo.id).set({
        title,
        due
      }, { merge: true })
      commit('edit', { todo, title, due })
      this.$toast.show('A task has been updated')
    } catch (error) {
      this.$toast.error(error)
    }
  },
  async remove ({ commit }, { todo }) {
    try {
      await fireDb.collection(collectionName).doc(todo.id).delete()
      commit('remove', { todo })
      this.$toast.show('A task has been removed')
    } catch (error) {
      this.$toast.error(error)
    }
  },
  guestFetch ({ commit }) {
    const today = new Date()
    today.setHours(23, 59, 59, 999)
    commit('add', {
      title: 'walk my dog',
      due: today
    })

    const tomorrow = new Date()
    tomorrow.setHours(23, 59, 59, 999)
    tomorrow.setDate(tomorrow.getDate() + 1)
    commit('add', {
      title: 'go jogging',
      due: tomorrow
    })
  },
  guestAdd ({ commit, state }, { title, due }) {
    commit('add', {
      id: state.incrementId,
      title,
      due
    })
    commit('idInc')
    this.$toast.show('A new task has been created')
  },
  guestToggle ({ commit }, { todo }) {
    commit('toggle', { todo })
  },
  guestEdit ({ commit }, { todo, title, due }) {
    commit('edit', { todo, title, due })
    this.$toast.show('A task has been updated')
  },
  guestRemove ({ commit }, { todo }) {
    commit('remove', { todo })
    this.$toast.show('A task has been removed')
  }
}
