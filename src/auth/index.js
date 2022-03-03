import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInAnonymously,
} from "firebase/auth";
import { auth } from "../firebase-config.js";
import { publish, subscribe } from "../topic-manager";
import {
  AUTH_LOGIN_ERROR,
  AUTH_SIGNUP_ERROR,
  LOGIN_ANONYMOUSLY,
  LOGIN_WITH_EMAIL,
  LOGIN_WITH_GOOGLE,
  LOGOUT_USER,
  SIGNUP_WITH_EMAIL,
  SIGNUP_WITH_GOOGLE,
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

async function handleAnonymousLogin() {
  try {
    await signInAnonymously(auth);
  } catch (e) {
    console.log(e);
  }
}
subscribe(LOGIN_ANONYMOUSLY, handleAnonymousLogin);

async function handleLogout(topic) {
  try {
    await signOut(auth);
  } catch (e) {
    console.log(e);
  }
}
subscribe(LOGOUT_USER, handleLogout);

async function handleGoogleSignup(topic) {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (e) {
    console.log(e);
    if (e.code === "account-exists-with-different-credential") {
      publish(AUTH_SIGNUP_ERROR, {
        error: "Account already exist",
      });
    } else if (e.code === "auth/email-already-in-use") {
      publish(AUTH_SIGNUP_ERROR, {
        error: "Email already taken",
      });
    } else if (e.code === "auth/invalid-email") {
      publish(AUTH_SIGNUP_ERROR, {
        error: "Invalid email",
      });
    }
  }
}
subscribe(SIGNUP_WITH_GOOGLE, handleGoogleSignup);

async function handleEmailSignup(topic, { email, password }) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    console.log(e);
    if (e.code === "account-exists-with-different-credential") {
      publish(AUTH_SIGNUP_ERROR, {
        error: "Account already exist",
      });
    } else if (e.code === "auth/email-already-in-use") {
      publish(AUTH_SIGNUP_ERROR, {
        error: "Email already taken",
      });
    } else if (e.code === "auth/invalid-email") {
      publish(AUTH_SIGNUP_ERROR, {
        error: "Invalid email",
      });
    }
  }
}
subscribe(SIGNUP_WITH_EMAIL, handleEmailSignup);
