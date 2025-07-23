// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
console.log(import.meta.env.VITE_FIREBASE_API_KEY);
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "berlin-auf-deutsch.firebaseapp.com",
  projectId: "berlin-auf-deutsch",
  storageBucket: "berlin-auf-deutsch.firebasestorage.app",
  messagingSenderId: "772039986769",
  appId: "1:772039986769:web:430a8fde1ad6ab46677270",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
