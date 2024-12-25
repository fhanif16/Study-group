// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpT8pFOOmOEh8ewz4NHizPQt1Ao1S7NIk",
  authDomain: "simple-firebase-5cf8f.firebaseapp.com",
  projectId: "simple-firebase-5cf8f",
  storageBucket: "simple-firebase-5cf8f.firebasestorage.app",
  messagingSenderId: "644729809281",
  appId: "1:644729809281:web:9db33a20ef92f2f5a2e080"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);