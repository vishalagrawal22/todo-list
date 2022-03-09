import Header from "./components/Header";
import ProjectDisplay from "./components/ProjectDisplay";
import TodoDisplay from "./components/TodoDisplay";

import { useEffect, useState } from "react";

import "./App.css";
import { useCurrentUser } from "./auth/hooks";
import Footer from "./components/Footer";

function App() {
  const user = useCurrentUser();
  const [selectedProjectId, setSelectedProjectId] = useState("all");

  useEffect(() => {
    setSelectedProjectId("all");
  }, [user]);

  return (
    <>
      <Header />
      <main>
        <ProjectDisplay
          selectedProjectId={selectedProjectId}
          setSelectedProjectId={setSelectedProjectId}
        />
        <TodoDisplay parentProjectId={selectedProjectId} />
      </main>
      <Footer />
    </>
  );
}

export default App;
