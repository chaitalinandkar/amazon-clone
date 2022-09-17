import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSjt6OSw8pXJDMkaDUHiKsu9bVMF_lsL4",
  authDomain: "clone-challenge-af177.firebaseapp.com",
  projectId: "clone-challenge-af177",
  storageBucket: "clone-challenge-af177.appspot.com",
  messagingSenderId: "265430366156",
  appId: "1:265430366156:web:068431d7212ea654ee8f69",
  measurementId: "G-5B8076EMTB"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig)

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };