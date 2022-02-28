import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase-config.js";
import { subscribe } from "../topic-manager";
import {
  SIGN_IN_WITH_EMAIL,
  SIGN_IN_WITH_GOOGLE,
  SIGN_OUT_USER,
} from "./topics";

async function handleEmailSignIn(topic, { email, password }) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    console.log(e);
  }
}
subscribe(SIGN_IN_WITH_EMAIL, handleEmailSignIn);

const googleProvider = new GoogleAuthProvider();
async function handleGoogleSignIn(topic) {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (e) {
    console.log(e);
  }
}
subscribe(SIGN_IN_WITH_GOOGLE, handleGoogleSignIn);

async function handleSignOut(topic) {
  try {
    await signOut(auth);
  } catch (e) {
    console.log(e);
  }
}
subscribe(SIGN_OUT_USER, handleSignOut);
