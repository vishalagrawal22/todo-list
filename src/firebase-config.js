import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLl-UQGbnc1BBzakisG3e4Vg85eWEzO5c",
  authDomain: "todo-list-c0a90.firebaseapp.com",
  projectId: "todo-list-c0a90",
  storageBucket: "todo-list-c0a90.appspot.com",
  messagingSenderId: "451514977202",
  appId: "1:451514977202:web:0761ac09e082541602f2ab",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
