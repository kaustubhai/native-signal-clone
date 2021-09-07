import firebase from "firebase/app";

// Optionally import the services that you want to use
import "firebase/auth";
// import "firebase/database";
import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC5DftS4TUqyXXYqVq0VQKG4viW3WZaJ8E",
  authDomain: "signal-clone-9ab0a.firebaseapp.com",
  projectId: "signal-clone-9ab0a",
  storageBucket: "signal-clone-9ab0a.appspot.com",
  messagingSenderId: "253033714595",
  appId: "1:253033714595:web:8f1b918d3c8707d71cc016",
  measurementId: "G-J6D9VSWE8C",
};

let app;
if (firebase.apps.length === 0) app = firebase.initializeApp(firebaseConfig);
else app = firebase.app();

export const db = app.firestore();
export const auth = firebase.auth();
