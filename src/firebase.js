// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// REPLACE WITH YOUR ACTUAL FIREBASE CONFIG KEYS
const firebaseConfig = {
    apiKey: "AIzaSyCsY1G4w8xiEsmA18grB0y8j0xGpYGHuvc",
    authDomain: "loop-68ca1.firebaseapp.com",
    projectId: "loop-68ca1",
    storageBucket: "loop-68ca1.firebasestorage.app",
    messagingSenderId: "624991623230",
    appId: "1:624991623230:web:01fbc31c9697f77d62196f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
