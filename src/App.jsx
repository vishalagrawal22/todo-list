import Header from "./components/Header";
import "./App.css";
import { useCurrentUser } from "./auth/hooks";
import { useEffect } from "react";
import { publish } from "./topic-manager";
import { LOGIN_ANONYMOUSLY } from "./auth/topics";

function App() {
  const user = useCurrentUser();

  useEffect(() => {
    if (user === null) {
      publish(LOGIN_ANONYMOUSLY);
    }
  }, [user]);

  return (
    <div>
      <Header />
    </div>
  );
}

export default App;
