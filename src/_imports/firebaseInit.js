// import store from '../store'
import Firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyDEg6KepP-GTz7rtfDr4TmlGWTJJnPZk_I',
  authDomain: 'flashcards-5bcb1.firebaseapp.com',
  databaseURL: 'https://flashcards-5bcb1.firebaseio.com',
  projectId: 'flashcards-5bcb1',
  storageBucket: 'flashcards-5bcb1.appspot.com',
  messagingSenderId: '498617502369'
}

export default {
  install: (Vue, options) => {
    const firebase = Firebase.initializeApp(config)
    const auth = firebase.auth()
    const db = firebase.firestore()

    // Persistance
    db.enablePersistence()
      .catch(err => {
        if (err.code === 'failed-precondition') console.log('The can only run in one tab at a time!')
        else if (err.code === 'unimplemented') console.log('Your browser does not support persistance')
      })

    // Install to prototype
    Vue.prototype.$auth = {
      login: async (username, password) => {
        await auth.signInWithEmailAndPassword(username, password)
          .then(user => { return user })
      },
      loginWithGoogle: async () => {
        const provider = new Firebase.auth.GoogleAuthProvider()
        auth.signInWithRedirect(provider)
          .then(result => {
            const docRef = db.collection('user')
            const userId = result.user.uid
            const email = result.user.email
            if (docRef.doc(userId)) {
              // TASK SET USER STORE ACTION
              return result
            } else {
              docRef.doc(userId).set({ id: userId, email })
                .then(() => {
                  // TASK SET USER STORE ACTION
                  return result
                })
                .catch(err => console.log(err))
            }
          }).catch(err => console.log(err))
      },
      logout: async () => {
        // TASK STORE LOGOUT ACTION
        await auth.signOut()
      }
    }

    Vue.prototype.$firestore = {
      db
    }

    // AUTH STATE CHECK
    auth.onAuthStateChanged(user => {
      // TASK LAODING SPINNER ACTION
      // TASK UPDATE USER ACTION
      // if (user) router.push('/')
    })
  }
}
