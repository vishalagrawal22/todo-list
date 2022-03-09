import { signInAnonymously } from "firebase/auth";
import { auth } from "../firebase-config";

export async function loginAnonymously() {
  try {
    await signInAnonymously(auth);
  } catch (e) {
    console.log(e);
  }
}
