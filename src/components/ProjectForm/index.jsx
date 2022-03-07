import formStyles from "../form-styles.module.css";

import Overlay from "../Overlay";

import { useEffect, useState } from "react";

import { ADD_PROJECT, DELETE_PROJECT, EDIT_PROJECT } from "../../data/topics";
import { publish } from "../../topic-manager";

import { useCurrentUser } from "../../auth/hooks";
import { ProjectFactory } from "../../data/data-factory";

function ProjectForm({ removeFormFromDisplay, mode, oldProject }) {
  const user = useCurrentUser();
  const [name, setName] = useState("");

  function onSubmit(event) {
    event.preventDefault();
    let topic, project;
    if (mode === "add") {
      project = ProjectFactory(null, name);
      topic = ADD_PROJECT;
    } else if (mode === "edit") {
      const { id, data } = oldProject;
      const { isDefault } = data;
      project = ProjectFactory(id, name, isDefault);
      topic = EDIT_PROJECT;
    } else if (mode === "delete") {
      const { id, data } = oldProject;
      const { isDefault } = data;
      project = ProjectFactory(id, name, isDefault);
      topic = DELETE_PROJECT;
    }
    publish(topic, { user, project });
    removeFormFromDisplay();
  }

  useEffect(() => {
    setName(oldProject?.data.name || "");
  }, [oldProject]);

  return (
    <Overlay removeFormFromDisplay={removeFormFromDisplay}>
      {mode === "delete" ? (
        <form className={formStyles["form"]} onSubmit={onSubmit}>
          <label
            className={`${formStyles["label"]} ${formStyles["text-center"]}`}
          >
            This action will delete project {name}
          </label>
          <button className={formStyles["submit"]}>delete</button>
        </form>
      ) : (
        <form className={formStyles["form"]} onSubmit={onSubmit}>
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
          <button className={formStyles["submit"]}>
            {mode === "add" ? "add" : "edit"}
          </button>
        </form>
      )}
    </Overlay>
  );
}

export default ProjectForm;
