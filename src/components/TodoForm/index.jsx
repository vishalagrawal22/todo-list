import formStyles from "../form-styles.module.css";
import styles from "../TodoDisplay/styles.module.css";

import Overlay from "../Overlay";
import { useEffect, useState } from "react";

import { formatDateForDatePicker } from "../../helpers/date";
import { publish } from "../../topic-manager";

import { ADD_TODO, EDIT_TODO } from "../../data/topics";
import { useCurrentUser } from "../../auth/hooks";
import { TodoFactory } from "../../data/data-factory";
import { getDefaultProject } from "../../data/helper";

function TodoForm({ removeFormFromDisplay, mode, oldTodo, parentProjectId }) {
  const user = useCurrentUser();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: formatDateForDatePicker(new Date()),
    priority: "1",
  });

  function onChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function isChecked(value) {
    return formData.priority === value;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let id = parentProjectId;
    if (id === "all") {
      id = await getDefaultProject(user);
    }

    let topic = null;
    let todo = null;
    if (mode === "add") {
      topic = ADD_TODO;
      todo = TodoFactory(
        null,
        id,
        formData.title,
        formData.description,
        formData.deadline,
        formData.priority
      );
    } else if (mode === "edit") {
      topic = EDIT_TODO;
      const data = { id: oldTodo.id, ...oldTodo.data, ...formData };
      todo = TodoFactory(
        data.id,
        data.parentProjectId,
        data.title,
        data.description,
        data.deadline,
        data.priority,
        data.isCompleted
      );
    }
    publish(topic, {
      user,
      todo,
    });
    removeFormFromDisplay();
  }

  useEffect(() => {
    setFormData({
      title: oldTodo?.data?.title || "",
      description: oldTodo?.data?.description || "",
      deadline: oldTodo?.data?.deadline || formatDateForDatePicker(new Date()),
      priority: oldTodo?.data?.priority || "1",
    });
  }, [oldTodo]);

  return (
    <Overlay removeFormFromDisplay={removeFormFromDisplay}>
      <form className={formStyles["form"]} onSubmit={handleSubmit}>
        <label htmlFor="title" className={formStyles["label"]}>
          Title:
        </label>
        <input
          className={formStyles["text-input"]}
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={onChange}
          required
        />
        <label htmlFor="description" className={formStyles["label"]}>
          Description:
        </label>
        <textarea
          name="description"
          id="description"
          className={formStyles["text-area"]}
          value={formData.description}
          onChange={onChange}
          required
        ></textarea>
        <label htmlFor="deadline" className={formStyles["label"]}>
          Deadline:
        </label>
        <input
          type="date"
          id="deadline"
          name="deadline"
          className={formStyles["date"]}
          value={formData.deadline}
          onChange={onChange}
          required
        />
        <fieldset className={styles["priority-options"]}>
          <legend className={formStyles["label"]}>Priority</legend>
          <label className={`${styles["option"]} ${styles["priority-1"]}`}>
            <input
              type="radio"
              name="priority"
              value="1"
              onChange={onChange}
              checked={isChecked("1")}
            />
            urgent and important
          </label>
          <label className={`${styles["option"]} ${styles["priority-2"]}`}>
            <input
              type="radio"
              name="priority"
              value="2"
              onChange={onChange}
              checked={isChecked("2")}
            />
            urgent but not important
          </label>
          <label className={`${styles["option"]} ${styles["priority-3"]}`}>
            <input
              type="radio"
              name="priority"
              value="3"
              onChange={onChange}
              checked={isChecked("3")}
            />
            not urgent but important
          </label>
          <label className={`${styles["option"]} ${styles["priority-4"]}`}>
            <input
              type="radio"
              name="priority"
              value="4"
              onChange={onChange}
              checked={isChecked("4")}
            />
            not urgent and not important
          </label>
        </fieldset>
        <button className={formStyles["submit"]}>submit</button>
      </form>
    </Overlay>
  );
}

export default TodoForm;
