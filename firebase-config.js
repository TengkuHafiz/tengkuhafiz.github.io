// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js";

// Your actual Firebase config object from the Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyB_YLLhMF_MQxS-7f465du6dY-K2KNd6wo",
  authDomain: "tengku-blog.firebaseapp.com",
  projectId: "tengku-blog",
  storageBucket: "tengku-blog.firebasestorage.app",
  messagingSenderId: "957782806169",
  appId: "1:957782806169:web:63df36c917f6f8b899f208",
  measurementId: "G-TGL3R6J0S2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

// Your designated Admin Email
const ADMIN_EMAIL = "engkufizz@gmail.com"; 

export { app, auth, db, storage, googleProvider, ADMIN_EMAIL };