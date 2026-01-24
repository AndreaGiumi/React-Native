// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfpwk8lpMxQwVeKWfZUW_8lGiwQsnYZf0",
  authDomain: "user-crud-59025.firebaseapp.com",
  projectId: "user-crud-59025",
  storageBucket: "user-crud-59025.firebasestorage.app",
  messagingSenderId: "866779006573",
  appId: "1:866779006573:web:38e3817f590e4a8d7b2164"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
