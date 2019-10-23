<template>
  <div class="container">
    <table class="info-container">
      <tbody>
        <tr>
          <td>
            Email
          </td>
          <td class="expand">
            {{ email }}
          </td>
          <td>
            <button
              v-if="!emailVerified"
              class="btn contained notice"
              @click="handleVerify"
            >
              verify
            </button>
            <button
              v-if="emailVerified"
              class="btn contained disabled"
              disabled
            >
              verified
            </button>
          </td>
        </tr>
        <tr>
          <td>
            Display name
          </td>
          <td v-if="!editting" class="expand">
            {{ displayName }}
          </td>
          <td v-if="editting" class="expand">
            <input
              v-model="inputDisplayName"
              class="input-t fullsize"
              type="text"
              @keyup="handleKeyUp"
              @blur="handleSubmit"
            >
          </td>
          <td>
            <button v-if="!editting && !processing" class="btn contained notice" @click="handleEdit">
              edit
            </button>
            <button v-if="editting && !processing" class="btn contained danger" @click="handleSubmit">
              ok
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="splitter" />
    <nuxt-link to="/" class="btn contained notice">
      home
    </nuxt-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      editting: false,
      inputDisplayName: ''
    }
  },
  computed: {
    authInfo () {
      return this.$store.state.auth.info
    },
    isLogin () {
      return this.authInfo !== null
    },
    displayName () {
      return this.isLogin ? this.authInfo.displayName : ''
    },
    email () {
      return this.isLogin ? this.authInfo.email : ''
    },
    emailVerified () {
      return this.isLogin ? this.authInfo.emailVerified : false
    },
    inputValid () {
      return this.inputDisplayName.trim().length > 0 &&
        this.inputDisplayName.trim() !== this.displayName
    },
    processing () {
      return this.$store.state.auth.processing
    }
  },
  methods: {
    handleKeyUp (e) {
      if (e.type === 'keyup') {
        if (e.keyCode === 13) {
          this.handleSubmit()
        }
      }
    },
    handleEdit () {
      this.editting = true
      this.inputDisplayName = this.displayName
    },
    handleSubmit () {
      if (this.inputValid) {
        this.$store.dispatch('auth/updateProfile', {
          displayName: this.inputDisplayName
        })
      }
      this.editting = false
      this.inputDisplayName = ''
    },
    handleVerify () {
      this.$store.dispatch('auth/sendVerification')
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.container > * {
  width: 100%;
  max-width: 600px;
  background: #FFF;
  opacity: 0.85;
}

.splitter {
  height: 20px;
  background: none;
}

.info-container {
  margin: 16px;
  white-space: nowrap;
}

.info-container td {
  padding: 8px 8px;
}

.info-container td.expand {
  width: 100%;
}

.fullsize {
  width: 100%;
}

.clickable {
  cursor: pointer;
}

.btn {
  width: 100%;
}
</style>
