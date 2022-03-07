import deleteIconImage from "./images/delete.svg";
import editIconImage from "./images/edit.svg";

import styles from "./styles.module.css";

import ProjectForm from "../ProjectForm";

import { useCallback, useState } from "react";
import { ProjectFactory } from "../../data/data-factory";

function FormDataFactory(mode, oldProject = null) {
  return { mode, oldProject };
}

function ProjectDisplay() {
  const [formData, setFormData] = useState({});
  const projects = {
    1: ProjectFactory(1, "abc", true),
    2: ProjectFactory(2, "xyz"),
    3: ProjectFactory(3, "project"),
  };

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
              <h3 className={styles["project-name"]}>all</h3>
            </article>
          </li>
          {Object.keys(projects).map((id) => {
            return (
              <li key={id} className={styles["project-item"]}>
                <article>
                  <h3 className={styles["project-name"]}>
                    {projects[id].data.name}
                  </h3>
                  <div className={styles["project-actions"]}>
                    <img
                      src={editIconImage}
                      alt="edit-button"
                      onClick={() => {
                        addEditProjectFormToDisplay(id);
                      }}
                    />
                    <img
                      src={deleteIconImage}
                      alt="delete-button"
                      onClick={() => {
                        deleteProject(id);
                      }}
                    />
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

export default ProjectDisplay;
