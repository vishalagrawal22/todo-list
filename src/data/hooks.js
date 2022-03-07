import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase-config";
import { ProjectFactory } from "./data-factory";

function useProjects(user) {
  const [projects, setProjects] = useState([]);
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
        setProjects(projects);
      });
      return unsubscribe;
    }
  }, [user]);
  return projects;
}

export { useProjects };
