import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { subscribe } from "../topic-manager";
import {
  ADD_PROJECT,
  DELETE_PROJECT,
  EDIT_PROJECT,
  ADD_TODO,
  EDIT_TODO,
} from "./topics";

async function handleAddProject(topic, { user, project }) {
  try {
    const projectCollectionRef = collection(db, "users", user.uid, "projects");
    await addDoc(projectCollectionRef, project.data);
  } catch (e) {
    console.log(e);
  }
}
subscribe(ADD_PROJECT, handleAddProject);

async function handleEditProject(topic, { user, project }) {
  try {
    const projectDocRef = doc(db, "users", user.uid, "projects", project.id);
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
    const todoDeletePromises = todoSnap.docs.map((todo) => {
      return deleteDoc(doc(todoCollectionRef, todo.id));
    });
    await Promise.all(todoDeletePromises);

    const projectDocRef = doc(db, "users", user.uid, "projects", project.id);
    await deleteDoc(projectDocRef);
  } catch (e) {
    console.log(e);
  }
}
subscribe(DELETE_PROJECT, handleDeleteProject);

async function handleAddTodo(topic, { user, todo }) {
  try {
    const todoCollectionRef = collection(
      db,
      "users",
      user.uid,
      "projects",
      todo.data.parentProjectId,
      "todos"
    );
    // saving user uid in todo for collection group query
    await addDoc(todoCollectionRef, { userId: user.uid, ...todo.data });
  } catch (e) {
    console.log(e);
  }
}
subscribe(ADD_TODO, handleAddTodo);

async function handleEditTodo(topic, { user, todo }) {
  try {
    const todoDocRef = doc(
      db,
      "users",
      user.uid,
      "projects",
      todo.data.parentProjectId,
      "todos",
      todo.id
    );
    await setDoc(todoDocRef, { userId: user.uid, ...todo.data });
  } catch (e) {
    console.log(e);
  }
}
subscribe(EDIT_TODO, handleEditTodo);
