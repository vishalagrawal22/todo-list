import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase-config.js";
import { publish, subscribe } from "../topic-manager";
import {
  AUTH_LOGIN_ERROR,
  LOGIN_WITH_EMAIL,
  LOGIN_WITH_GOOGLE,
  LOGOUT_USER,
} from "./topics";

async function handleEmailLogin(topic, { email, password }) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    console.log(e);
    if (e.code === "auth/user-not-found") {
      publish(AUTH_LOGIN_ERROR, {
        error: "User not found",
      });
    } else if (e.code === "auth/wrong-password") {
      publish(AUTH_LOGIN_ERROR, {
        error: "Incorrect password",
      });
    }
  }
}
subscribe(LOGIN_WITH_EMAIL, handleEmailLogin);

const googleProvider = new GoogleAuthProvider();
async function handleGoogleLogin(topic) {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (e) {
    console.log(e);
  }
}
subscribe(LOGIN_WITH_GOOGLE, handleGoogleLogin);

async function handleLogout(topic) {
  try {
    await signOut(auth);
  } catch (e) {
    console.log(e);
  }
}
subscribe(LOGOUT_USER, handleLogout);
