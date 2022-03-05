import deleteIconImage from "./images/delete.svg";
import editIconImage from "./images/edit.svg";

import styles from "./styles.module.css";

function ProjectDisplay() {
  return (
    <nav className={styles["project-section"]}>
      <h2 className={styles["project-section-heading"]}>Projects</h2>
      <button className={styles["add-project-button"]}>Add Project</button>
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

export default ProjectDisplay;
