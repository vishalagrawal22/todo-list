import { addDoc, collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../firebase-config";

async function createDefaultProject(user) {
  const projectCollectionRef = collection(db, "users", user.uid, "projects");
  const doc = await addDoc(projectCollectionRef, {
    name: "miscellaneous",
    isDefault: true,
  });
  return doc.id;
}

export async function getDefaultProject(user) {
  const projectCollectionRef = collection(db, "users", user.uid, "projects");
  const projectQuery = query(
    projectCollectionRef,
    where("isDefault", "==", true)
  );
  const projectSnap = await getDocs(projectQuery);
  if (projectSnap.size === 0) {
    const id = await createDefaultProject(user);
    return id;
  } else {
    return projectSnap.docs[0].id;
  }
}
