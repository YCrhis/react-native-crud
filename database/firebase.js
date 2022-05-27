import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOR86jMRC1bJ3Px40GY6NpH9RMv5t35gE",
  authDomain: "reactnativecrud-ee35e.firebaseapp.com",
  projectId: "reactnativecrud-ee35e",
  storageBucket: "reactnativecrud-ee35e.appspot.com",
  messagingSenderId: "124920160489",
  appId: "1:124920160489:web:aa6d49bbebd33038479078",
};

const app = firebase.initializeApp(firebaseConfig);

export const db = app.firestore();

export default firebase;

/* firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore(); */
