<template>
  <div class="container">
    <div v-if="!processing" class="modal">
      <p class="mid-font">
        Welcome! {{ userName }}
      </p>
      <input
        v-if="!isLogin"
        v-model="inputEmail"
        type="text"
        placeholder="email"
        class="input-t interval mid-font"
        @keyup="handleKeyUp"
      >
      <input
        v-if="!isLogin"
        v-model="inputPassword"
        type="password"
        placeholder="password"
        class="input-t interval mid-font"
        @keyup="handleKeyUp"
      >
      <button
        v-if="isLogin"
        class="btn contained danger interval mid-font"
        @click="logout"
      >
        logout
      </button>
      <button
        v-if="!isLogin"
        class="btn contained danger interval mid-font"
        @click="login"
      >
        login
      </button>
      <button
        v-if="!isLogin"
        class="btn contained danger interval mid-font"
        @click="signup"
      >
        singup
      </button>
      <nuxt-link
        v-if="isLogin"
        to="/todos"
        class="btn contained notice interval mid-font"
      >
        todo list
      </nuxt-link>
      <nuxt-link
        v-if="isLogin"
        to="/profile"
        class="btn contained notice interval mid-font"
      >
        profile
      </nuxt-link>
      <nuxt-link
        v-if="!isLogin"
        to="/todos/guest"
        class="btn contained notice interval mid-font"
      >
        guest
      </nuxt-link>
    </div>
    <div v-if="processing" class="loading-modal">
      <loading />
    </div>
  </div>
</template>

<script>
import Loading from '~/components/Loading'

export default {
  components: {
    Loading
  },
  data () {
    return {
      inputEmail: '',
      inputPassword: ''
    }
  },
  computed: {
    authInfo () {
      return this.$store.state.auth.info
    },
    isLogin () {
      return this.authInfo !== null
    },
    userName () {
      if (this.isLogin) {
        return this.authInfo.displayName || this.authInfo.email || ''
      }
      return 'Please login'
    },
    inputValid () {
      return this.inputEmail.trim().length > 0 && this.inputPassword.trim().length > 0
    },
    processing () {
      return this.$store.state.auth.processing
    }
  },
  methods: {
    signup () {
      if (!this.inputValid) {
        this.$toast.error('email/password should not leave empty')
        return
      }
      this.$store.dispatch('auth/signup', { email: this.inputEmail, password: this.inputPassword })
      this.inputEmail = ''
      this.inputPassword = ''
    },
    login () {
      if (!this.inputValid) {
        this.$toast.error('email/password should not leave empty')
        return
      }
      this.$store.dispatch('auth/login', { email: this.inputEmail, password: this.inputPassword })
      this.inputEmail = ''
      this.inputPassword = ''
    },
    logout () {
      this.$store.dispatch('auth/logout')
    },
    handleKeyUp (e) {
      if (e.type === 'keyup') {
        if (e.keyCode === 13) {
          this.login()
        }
      }
    }
  }
}
</script>

<style scoped>
.container {
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(#070B34, #855988);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.modal {
  padding: 12px;
  background-color: #FFF;
  opacity: 0.85;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 360px;
}

.loading-modal {
  width: 100%;
  max-width: 360px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.interval {
  margin-top: 8px;
}

.mid-font {
  font-size: 14px;
}
</style>
