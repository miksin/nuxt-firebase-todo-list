import { fireAuth } from '@/plugins/firebase'

export const state = () => ({
  info: null,
  processing: false
})

export const mutations = {
  setAuth (state, info) {
    state.info = info
  },
  setProcessing (state, status) {
    state.processing = status
  }
}

export const actions = {
  async signup ({ commit }, { email, password }) {
    commit('setProcessing', true)
    try {
      await fireAuth.createUserWithEmailAndPassword(email, password)
      await fireAuth.currentUser.sendEmailVerification()
      this.$toast.show('sign up success')
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      this.$toast.error(`[${errorCode}] ${errorMessage}`)
    }
    commit('setProcessing', false)
  },
  async login ({ commit }, { email, password }) {
    commit('setProcessing', true)
    try {
      await fireAuth.signInWithEmailAndPassword(email, password)
      this.$toast.show('login success')
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      this.$toast.error(`[${errorCode}] ${errorMessage}`)
    }
    commit('setProcessing', false)
  },
  async logout ({ commit }) {
    commit('setProcessing', true)
    try {
      await fireAuth.signOut()
      this.$toast.show('logout success')
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      this.$toast.error(`[${errorCode}] ${errorMessage}`)
    }
    commit('setProcessing', false)
  },
  async updateProfile ({ commit, state }, { displayName }) {
    commit('setProcessing', true)
    try {
      await fireAuth.currentUser.updateProfile({ displayName })
      commit('setAuth', {
        ...state.info,
        displayName: fireAuth.currentUser.displayName
      })
      this.$toast.show('update success')
    } catch (error) {
      this.$toast.error(error)
    }
    commit('setProcessing', false)
  },
  async sendVerification () {
    try {
      await fireAuth.currentUser.sendEmailVerification()
      this.$toast.show('email has been sended')
    } catch (error) {
      this.$toast.error(error)
    }
  },
  async deleteAccount ({ commit }) {
    commit('setProcessing', true)
    try {
      await fireAuth.currentUser.delete()
      this.$toast.show('account has been deleted')
    } catch (error) {
      this.$toast.error(error)
    }
    commit('setProcessing', false)
  }
}
