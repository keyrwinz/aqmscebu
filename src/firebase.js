let firebase;

const firebaseConfig = {
  apiKey: "AIzaSyDi-LQfnj4fWBm3gVGqVzOQwh9gs70fNi8",
  authDomain: "aqms-db-thesis-2020.firebaseapp.com",
  databaseURL: "https://aqms-db-thesis-2020.firebaseio.com",
  projectId: "aqms-db-thesis-2020",
  storageBucket: "aqms-db-thesis-2020.appspot.com",
  messagingSenderId: "1089415169318",
  appId: "1:1089415169318:web:851e60a6b53bff02ea6de7",
  measurementId: "G-Y2P4T33T38",
};

if (typeof window !== 'undefined'){
  firebase = require('firebase');
  firebase.initializeApp(firebaseConfig);
  firebase.analytics()
}

export default firebase;