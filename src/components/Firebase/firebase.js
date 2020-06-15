import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/analytics'

// CONFIG FOR REALTIME DB
const firebaseConfig = {
  apiKey: process.env.API_FIREBASE,
  authDomain: 'aqmscebu.firebaseapp.com',
  databaseURL: 'https://aqmscebu.firebaseio.com',
  projectId: 'aqmscebu',
  storageBucket: 'aqmscebu.appspot.com',
  messagingSenderId: '87641127223',
  appId: '1:87641127223:web:1e3c9b20b0176b221202b2',
  measurementId: 'G-SYM7TXDQB0',
}

firebase.initializeApp(firebaseConfig)
firebase.analytics()

export default firebase
