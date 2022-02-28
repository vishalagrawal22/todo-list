import { useEffect, useState } from "react";
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

function useCurrentUser() {
  const [user, setUser] = useState(auth.currentUser);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);
  return user;
}

export { useCurrentUser };
