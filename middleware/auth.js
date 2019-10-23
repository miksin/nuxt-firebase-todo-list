import { fireAuth } from '@/plugins/firebase'

export default function ({ route, store, redirect }) {
  if (!fireAuth.currentUser) {
    switch (route.name) {
      case 'todos':
      case 'profile':
        redirect('/')
        break
      default:
        break
    }
  }
}
