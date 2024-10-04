import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAJ7fLm9Sw5i2RdwfB19gZmDhrtspTJqVk",
  authDomain: "login-projeto-ifam.firebaseapp.com",
  projectId: "login-projeto-ifam",
  storageBucket: "login-projeto-ifam.appspot.com",
  messagingSenderId: "720051361377",
  appId: "1:720051361377:web:1d28b3e8b49c7b9f4c3c20"
};

export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
export const db = getFirestore(firebase); // Inicializar o Firestore

