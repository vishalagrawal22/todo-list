import deleteIconImage from "./images/delete.svg";
import editIconImage from "./images/edit.svg";

import styles from "./styles.module.css";
import formStyles from "../form-styles.module.css";

import Overlay from "../Overlay";

import { useEffect, useState } from "react";

import {
  ADD_PROJECT,
  DB_ADD_PROJECT_ERROR,
  DB_ADD_PROJECT_SUCCESS,
} from "../../data/topics";
import { publish, unsubscribe, subscribe } from "../../topic-manager";
import { useCurrentUser } from "../../auth/hooks";
import { ProjectFactory } from "../../data/data-factory";

function ProjectDisplay() {
  const user = useCurrentUser();
  const [name, setName] = useState("");
  const [isFormActive, setIsFormActive] = useState(false);
  const [error, setError] = useState("");
  function addFormToDisplay() {
    setIsFormActive(true);
  }

  function removeFormFromDisplay() {
    setName("");
    setIsFormActive(false);
  }

  function addProject(event) {
    event.preventDefault();
    const project = ProjectFactory(name);
    publish(ADD_PROJECT, { user, project });
  }

  useEffect(() => {
    const token = subscribe(DB_ADD_PROJECT_ERROR, ({ error }) => {
      setError(error);
    });
    return () => unsubscribe(token);
  }, []);

  useEffect(() => {
    const token = subscribe(DB_ADD_PROJECT_SUCCESS, removeFormFromDisplay);
    return () => unsubscribe(token);
  }, []);

  if (isFormActive) {
    return (
      <Overlay removeFormFromDisplay={removeFormFromDisplay}>
        <form className={formStyles["form"]} onSubmit={addProject}>
          <label htmlFor="project-name" className={formStyles["label"]}>
            Project Name:
          </label>
          <input
            className={formStyles["text-input"]}
            type="text"
            id="project-name"
            name="project-name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            size="46"
            required
          />
          <button className={formStyles["submit"]}>Submit</button>
          <span className={formStyles["error"]}>{error}</span>
        </form>
      </Overlay>
    );
  } else {
    return (
      <nav className={styles["project-section"]}>
        <h2 className={styles["project-section-heading"]}>Projects</h2>
        <button
          className={styles["add-project-button"]}
          onClick={addFormToDisplay}
        >
          Add Project
        </button>
        <ul>
          <li className={styles["project-item"]}>
            <article>
              <h3 className={styles["project-name"]}>all</h3>
            </article>
          </li>

          <li key="project-1" className={styles["project-item"]}>
            <article>
              <h3 className={styles["project-name"]}>Project 1</h3>
              <div className={styles["project-actions"]}>
                <img src={editIconImage} alt="edit-button" />
                <img src={deleteIconImage} alt="delete-button" />
              </div>
            </article>
          </li>
        </ul>
      </nav>
    );
  }
}

export default ProjectDisplay;
