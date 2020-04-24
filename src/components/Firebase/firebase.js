let firebase

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

// CONFIG FOR FIRESTORE
// const firebaseConfig = {
//   apiKey: process.env.API_FIRESTORE,
//   authDomain: "aqms-db-thesis-2020.firebaseapp.com",
//   databaseURL: "https://aqms-db-thesis-2020.firebaseio.com",
//   projectId: "aqms-db-thesis-2020",
//   storageBucket: "aqms-db-thesis-2020.appspot.com",
//   messagingSenderId: "1089415169318",
//   appId: "1:1089415169318:web:851e60a6b53bff02ea6de7",
//   measurementId: "G-Y2P4T33T38",
// };

if (typeof window !== 'undefined') {
  // eslint-disable-next-line global-require
  firebase = require('firebase')
  firebase.initializeApp(firebaseConfig)
  firebase.analytics()
}

export default firebase
