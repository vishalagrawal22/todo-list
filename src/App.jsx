import Header from "./components/Header";
import ProjectDisplay from "./components/ProjectDisplay";
import TodoDisplay from "./components/TodoDisplay";

import { useState } from "react";

import "./App.css";

function App() {
  const [selectedProjectId, setSelectedProjectId] = useState("all");
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
    </>
  );
}

export default App;
