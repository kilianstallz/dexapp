// import store from '../store'
import Firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import store from '../store'
import router from '../router'

const config = {
  apiKey: 'AIzaSyDEg6KepP-GTz7rtfDr4TmlGWTJJnPZk_I',
  authDomain: 'flashcards-5bcb1.firebaseapp.com',
  databaseURL: 'https://flashcards-5bcb1.firebaseio.com',
  projectId: 'flashcards-5bcb1',
  storageBucket: 'flashcards-5bcb1.appspot.com',
  messagingSenderId: '498617502369'
}

const firebase = Firebase.initializeApp(config)
const auth = firebase.auth()
const db = firebase.firestore()

export default {
  install: (Vue, options) => {
    // Persistance
    db.enablePersistence()
      .catch(err => {
        if (err.code === 'failed-precondition') console.log('The can only run in one tab at a time!')
        else if (err.code === 'unimplemented') console.log('Your browser does not support persistance')
      })

    // Install to prototype
    Vue.prototype.$auth = {
      login: async (username, password) => {
        try {
          const { user } = await auth.signInWithEmailAndPassword(username, password)
          const { uid, email, displayName } = user // Get Elements for doc
          const usersRef = await db.collection('users')
          // If user data is stored in database
          let userDoc = await usersRef.doc(uid).get() // Get user Document
          if (userDoc.exists) { // Check its existance
            store.dispatch('user/updateUser', user)
          } else {
            userDoc = await usersRef.doc(uid).set({ uid, email, displayName }) // Else overwrite with new doc
              .then(() => console.log('User doc written'))
            store.dispatch('user/updateUser', user)
          }
        } catch (e) {
          console.log(e)
          throw e
        }
      },
      signUp: async (dName, email, password) => {
        try {
          const { user } = await auth.createUserWithEmailAndPassword(email, password)
          user.updateProfile({ displayName: dName }).then(() => {
            console.log('User updated')
          })
          db.collection('users').doc(user.uid).set({ uid: user.uid, displayName: dName, email })
            .then(() => console.log('User doc written'))
        } catch (e) {
          console.log(e)
          throw e
        }
      },
      loginWithGoogle: async () => {
        const provider = new Firebase.auth.GoogleAuthProvider()
        try {
          const { user } = await auth.signInWithPopup(provider)
          const { uid, email, displayName } = user

          const usersRef = await db.collection('users')
          const userSnapshot = await usersRef.doc(uid).get()
          // If user data is stored in database
          if (userSnapshot.exists) {
            store.dispatch('user/updateUser', user)
          } else {
            const userDoc = await db.collection('users').doc(uid).set({ uid, email, displayName })
              .then(() => { console.log('Doc written') })
            store.dispatch('user/updateUser', userDoc)
          }
        } catch (e) {
          console.log(e)
        }
      }
    }

    Vue.prototype.$firestore = db

    // AUTH STATE CHECK
    auth.onAuthStateChanged(user => {
      if (!store.state.loadingSpinner) store.commit('LOADING_SPINNER', true)
      if (user) store.dispatch('user/updateUser', user)
      if (!user) router.push('/auth')
      store.commit('LOADING_SPINNER', false)
    })
  }
}

export { firebase, db, auth }
