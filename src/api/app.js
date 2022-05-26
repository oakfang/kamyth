// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3QU59_OM52ZOf2o0eh7PH2T12MgJDrwM",
  authDomain: "rpgkeeper-80986.firebaseapp.com",
  projectId: "rpgkeeper-80986",
  storageBucket: "rpgkeeper-80986.appspot.com",
  messagingSenderId: "519810299051",
  appId: "1:519810299051:web:c72d04c459145de8def3ee",
  measurementId: "G-YEL3GFDEMZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
