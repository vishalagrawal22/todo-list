import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  increment,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { subscribe } from "../topic-manager";
import { ADD_PROJECT, DELETE_PROJECT, EDIT_PROJECT } from "./topics";

async function increaseProjectCount(user) {
  try {
    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, { count: increment(1) }, { merge: true });
  } catch (e) {
    console.log(e);
  }
}

async function decreaseProjectCount(user) {
  try {
    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, { count: increment(-1) }, { merge: true });
  } catch (e) {
    console.log(e);
  }
}

async function handleAddProject(topic, { user, project }) {
  try {
    const projectCollectionRef = collection(db, "users", user.uid, "projects");
    await addDoc(projectCollectionRef, project.data);
    await increaseProjectCount(user);
  } catch (e) {
    console.log(e);
  }
}
subscribe(ADD_PROJECT, handleAddProject);

async function handleEditProject(topic, { user, project }) {
  try {
    const projectDocRef = collection(
      db,
      "users",
      user.id,
      "projects",
      project.id
    );
    await setDoc(projectDocRef, project.data);
  } catch (e) {
    console.log(e);
  }
}
subscribe(EDIT_PROJECT, handleEditProject);

async function handleDeleteProject(topic, { user, project }) {
  try {
    const todoCollectionRef = collection(
      db,
      "users",
      user.uid,
      "projects",
      project.id,
      "todos"
    );
    const todoQuery = query(todoCollectionRef);
    const todoSnap = await getDocs(todoQuery);
    const todoDeletePromises = todoSnap.data().map((todo) => {
      return deleteDoc(doc(todoCollectionRef, todo.id));
    });
    await Promise.all(todoDeletePromises);

    const projectDocRef = doc(db, "users", user.id, "projects", project.id);
    await deleteDoc(projectDocRef);

    await decreaseProjectCount(user);
  } catch (e) {
    console.log(e);
  }
}
subscribe(DELETE_PROJECT, handleDeleteProject);
