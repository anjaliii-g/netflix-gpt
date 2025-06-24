// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBueiUfMm8YQSakEGppmqrBDsoEhF31uJc",
  authDomain: "netflixgpt-7b71d.firebaseapp.com",
  projectId: "netflixgpt-7b71d",
  storageBucket: "netflixgpt-7b71d.firebasestorage.app",
  messagingSenderId: "301653259152",
  appId: "1:301653259152:web:72a61dda5fca5ead877915",
  measurementId: "G-WJFMNZN3VX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();

