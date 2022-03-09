import deleteIconImage from "./images/delete.svg";
import editIconImage from "./images/edit.svg";

import styles from "./styles.module.css";

import ProjectForm from "../ProjectForm";

import { useCallback, useState } from "react";
import { useProjects } from "../../data/hooks";
import { useCurrentUser } from "../../auth/hooks";

function FormDataFactory(mode, oldProject = null) {
  return { mode, oldProject };
}

function ProjectItem({
  project,
  addEditProjectFormToDisplay,
  deleteProject,
  selectedProjectId,
  setSelectedProjectId,
}) {
  return (
    <li className={styles["project-item"]}>
      <article>
        <h3
          className={styles["project-name"]}
          onClick={() => {
            setSelectedProjectId(project.id);
          }}
        >
          <span
            className={
              selectedProjectId === project.id ? styles["selected"] : ""
            }
          >
            {project.data.name}
          </span>
        </h3>
        <div className={styles["project-actions"]}>
          <img
            src={editIconImage}
            alt="edit-button"
            onClick={() => {
              addEditProjectFormToDisplay(project.id);
            }}
          />
          <img
            src={deleteIconImage}
            alt="delete-button"
            onClick={() => {
              deleteProject(project.id);
            }}
          />
        </div>
      </article>
    </li>
  );
}

function ProjectDisplay({ selectedProjectId, setSelectedProjectId }) {
  const [formData, setFormData] = useState({});
  const user = useCurrentUser();
  const projects = useProjects(user);

  function handleSelectedProject(id) {
    if (selectedProjectId === id) {
      setSelectedProjectId("all");
    }
  }

  function addNewProjectFormToDisplay() {
    setFormData(FormDataFactory("add"));
  }

  function addEditProjectFormToDisplay(id) {
    setFormData(FormDataFactory("edit", projects[id]));
  }

  function deleteProject(id) {
    setFormData(FormDataFactory("delete", projects[id]));
  }

  const removeFormFromDisplay = useCallback(() => {
    setFormData({});
  }, []);

  return (
    <>
      {Object.keys(formData).length !== 0 ? (
        <ProjectForm
          removeFormFromDisplay={removeFormFromDisplay}
          handleSelectedProject={handleSelectedProject}
          {...formData}
        />
      ) : null}
      <nav className={styles["project-section"]}>
        <h2 className={styles["project-section-heading"]}>Projects</h2>
        <button
          className={styles["add-project-button"]}
          onClick={addNewProjectFormToDisplay}
        >
          Add Project
        </button>
        <ul>
          <li className={styles["project-item"]}>
            <article>
              <h3
                className={styles["project-name"]}
                onClick={() => {
                  setSelectedProjectId("all");
                }}
              >
                <span
                  className={
                    selectedProjectId === "all" ? styles["selected"] : ""
                  }
                >
                  all
                </span>
              </h3>
            </article>
          </li>
          {Object.keys(projects).map((projectKey) => {
            const project = projects[projectKey];
            return (
              <ProjectItem
                key={projectKey}
                project={project}
                addEditProjectFormToDisplay={addEditProjectFormToDisplay}
                deleteProject={deleteProject}
                selectedProjectId={selectedProjectId}
                setSelectedProjectId={setSelectedProjectId}
              />
            );
          })}
        </ul>
      </nav>
    </>
  );
}

export default ProjectDisplay;
