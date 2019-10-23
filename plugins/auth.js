import { fireAuth } from '@/plugins/firebase'

const checkUserStatus = ({ store }) => new Promise((resolve, reject) => {
  fireAuth.onAuthStateChanged((user) => {
    if (user) {
      const {
        uid,
        email,
        displayName,
        emailVerified,
        refreshToken
      } = user
      store.commit('auth/setAuth', {
        uid,
        email,
        displayName,
        emailVerified,
        refreshToken
      })
    } else {
      store.commit('auth/setAuth', user)
    }
    resolve(user)
  }, err => reject(err))
})

export default checkUserStatus
