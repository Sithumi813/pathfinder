// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5l7RQFLJ1IVEETIGAg76IF2KLQWpmuzM",
  authDomain: "pathfinder-24200.firebaseapp.com",
  projectId: "pathfinder-24200",
  storageBucket: "pathfinder-24200.firebasestorage.app",
  messagingSenderId: "575551396955",
  appId: "1:575551396955:web:58475a8c8084c2af93737e",
  measurementId: "G-3HF2CWW4YX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);