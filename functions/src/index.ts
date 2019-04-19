import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
const firebase = admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const removeUserData = functions.auth.user().onDelete((user) => {
  const pm1 = firebase.firestore().collection('user').doc(user.uid).delete()
  // TASK: Remove Data
  Promise.all([pm1])
  console.log('Removed User:', user)
})
