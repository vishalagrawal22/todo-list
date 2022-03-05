import { addDoc, collection, doc, increment, setDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { publish, subscribe } from "../topic-manager";
import {
  ADD_PROJECT,
  DB_ADD_PROJECT_ERROR,
  DB_ADD_PROJECT_SUCCESS,
  INCREMENT_PROJECT_COUNT,
} from "./topics";

async function handleAddProject(topic, { user, project }) {
  try {
    const projectCollectionRef = collection(db, "users", user.uid, "projects");
    await addDoc(projectCollectionRef, project);
    publish(DB_ADD_PROJECT_SUCCESS);
    publish(INCREMENT_PROJECT_COUNT, { user });
  } catch (e) {
    console.log(e);
    publish(DB_ADD_PROJECT_ERROR, { error: e.code });
  }
}
subscribe(ADD_PROJECT, handleAddProject);

async function increaseProjectCount(topic, { user }) {
  try {
    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, { count: increment(1) }, { merge: true });
  } catch (e) {
    console.log(e);
  }
}
subscribe(INCREMENT_PROJECT_COUNT, increaseProjectCount);
