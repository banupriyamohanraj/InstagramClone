// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeeRWkfgisSd4pjNqnAunGXNuf_BCmLj0",
  authDomain: "instaapp-e41db.firebaseapp.com",
  projectId: "instaapp-e41db",
  storageBucket: "instaapp-e41db.appspot.com",
  messagingSenderId: "460677194597",
  appId: "1:460677194597:web:300c94a1a2a11ccb09f78c",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
export { app, db, storage };
