import { useState } from "react";

import deleteIconImage from "./images/delete.svg";
import editIconImage from "./images/edit.svg";
import addIconImage from "./images/add.svg";
import styles from "./styles.module.css";

import { useCurrentUser } from "../../auth/hooks";
import { useTodos } from "../../data/hooks";
import TodoForm from "../TodoForm";

function FormDataFactory(mode, oldTodo = null) {
  return { mode, oldTodo };
}

function TodoDisplay({ parentProjectId }) {
  const user = useCurrentUser();
  const todos = useTodos(user, parentProjectId === "all", parentProjectId);
  const [formData, setFormData] = useState({});

  function removeFormFromDisplay() {
    setFormData({});
  }

  function addNewTodoFormToDisplay() {
    setFormData(FormDataFactory("add"));
  }

  return (
    <>
      {formData?.mode ? (
        <TodoForm
          removeFormFromDisplay={removeFormFromDisplay}
          {...formData}
          parentProjectId={parentProjectId}
        />
      ) : null}
      <section className={styles["display-area"]}>
        <section className={styles["todos-section"]}>
          {Object.keys(todos).map((todoKey) => {
            const todo = todos[todoKey];
            return (
              <article
                className={
                  styles["todo-item"] +
                  " " +
                  styles[`priority-${todo.data.priority}`]
                }
                key={todoKey}
              >
                <div className={styles["todo-actions"]}>
                  <img
                    className={styles["edit-button"]}
                    src={editIconImage}
                    alt="edit button"
                  />
                  <img
                    className={styles["delete-button"]}
                    src={deleteIconImage}
                    alt="delete button"
                  />
                </div>
                <div className={styles["todo-info"]}>
                  <div className={styles["todo-data"]} data-type="title">
                    <div className={styles["todo-data-type"]}>Title:</div>
                    <div className={styles["todo-data-value"]}>
                      {todo.data.title}
                    </div>
                  </div>
                  <div className={styles["todo-data"]} data-type="time-left">
                    <div className={styles["todo-data-type"]}>Time Left:</div>
                    <div className={styles["todo-data-value"]}>
                      {todo.data.deadline}
                    </div>
                  </div>
                  <div className={styles["todo-data"]} data-type="description">
                    <div className={styles["todo-data-type"]}>Description:</div>
                    <div className={styles["todo-data-value"]}>
                      {todo.data.description}
                    </div>
                  </div>
                  <div className={styles["todo-data"]} data-type="status">
                    <div className={styles["todo-data-type"]}>Status:</div>
                    <div className={styles["todo-data-value"]}>
                      {todo.data.isComplete !== true ? "Pending" : "Completed"}
                    </div>
                  </div>
                  <div>
                    <button
                      className={styles["toggle-completed-status-button"]}
                    >
                      {todo.data.isComplete !== true
                        ? "Mark as completed"
                        : "Mark as pending"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </section>
      <div className={styles["float-button"]}>
        <img
          src={addIconImage}
          alt="add button"
          onClick={addNewTodoFormToDisplay}
        />
      </div>
    </>
  );
}

export default TodoDisplay;
