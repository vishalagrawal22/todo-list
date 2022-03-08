import { useEffect, useState } from "react";
import {
  collection,
  collectionGroup,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { ProjectFactory, TodoFactory } from "./data-factory";

export function useProjects(user) {
  const [projects, setProjects] = useState({});
  useEffect(() => {
    if (user !== null) {
      const projectCollectionRef = collection(
        db,
        "users",
        user.uid,
        "projects"
      );
      const projectQuery = query(projectCollectionRef, orderBy("name"));
      const unsubscribe = onSnapshot(projectQuery, (snapshot) => {
        const projects = snapshot.docs.map((doc) => {
          return ProjectFactory(doc.id, doc.data().name, doc.data().isDefault);
        });
        const projectsObject = {};
        projects.forEach((project) => {
          projectsObject[project.id] = project;
        });
        setProjects(projectsObject);
      });
      return unsubscribe;
    }
  }, [user]);
  return projects;
}

export function useTodos(user, fetchAll, parentProjectId) {
  const [todos, setTodos] = useState({});
  useEffect(() => {
    if (user !== null) {
      let todoCollectionRef = null;
      if (fetchAll) {
        todoCollectionRef = collectionGroup(db, "todos");
      } else {
        todoCollectionRef = collection(
          db,
          "users",
          user.uid,
          "projects",
          parentProjectId,
          "todos"
        );
      }

      const todoQuery = query(
        todoCollectionRef,
        where("userId", "==", user.uid),
        orderBy("isCompleted"),
        orderBy("priority")
      );

      const unsubscribe = onSnapshot(todoQuery, (snapshot) => {
        const todos = snapshot.docs.map((doc) => {
          const {
            parentProjectId,
            title,
            description,
            deadline,
            isCompleted,
            priority,
          } = doc.data();
          return TodoFactory(
            doc.id,
            parentProjectId,
            title,
            description,
            deadline,
            priority,
            isCompleted
          );
        });

        const todosObject = {};
        todos.forEach((todo) => {
          todosObject[todo.id] = todo;
        });
        setTodos(todosObject);
      });
      return unsubscribe;
    }
  }, [user, fetchAll, parentProjectId]);
  return todos;
}
