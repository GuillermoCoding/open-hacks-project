const firebase = require('firebase');
require('firebase/auth');

const app = firebase.initializeApp({
  apiKey: "AIzaSyDdpK5T4fX7rkJC7zNK8QqbqCbC-wMLUzA",
  authDomain: "torch-967c4.firebaseapp.com",
  databaseURL: "https://torch-967c4.firebaseio.com",
  projectId: "torch-967c4",
  storageBucket: "torch-967c4.appspot.com",
  messagingSenderId: "633072285227",
  appId: "1:633072285227:web:fd71fdc6cc182b4a7ddc6e",
  measurementId: "G-Q46YRZH1N4"
});

export const auth = firebase.auth;
export const db = firebase.database();
export default app;
