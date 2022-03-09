import { useState } from "react";

import deleteIconImage from "./images/delete.svg";
import editIconImage from "./images/edit.svg";
import addIconImage from "./images/add.svg";
import styles from "./styles.module.css";

import { useCurrentUser } from "../../auth/hooks";
import { loginAnonymously } from "../../auth/helper";
import { useTodos } from "../../data/hooks";
import TodoForm from "../TodoForm";
import { publish } from "../../topic-manager";
import { DELETE_TODO, EDIT_TODO } from "../../data/topics";
import { formatDate, isExpired, getTimeLeft } from "../../helpers/date";

function FormDataFactory(mode, oldTodo = null) {
  return { mode, oldTodo };
}

function TodoItem({
  todo,
  addEditTodoFormToDisplay,
  toggleCompletedStatus,
  deleteTodo,
}) {
  let timeLeft;
  const formattedDeadline = formatDate(todo.data.deadline);
  if (todo.data.isCompleted) {
    timeLeft = `Task is completed (${formattedDeadline})`;
  } else if (isExpired(todo.data.deadline)) {
    timeLeft = `Past due date (${formattedDeadline})`;
  } else {
    timeLeft = `${getTimeLeft(todo.data.deadline)} (${formattedDeadline})`;
  }

  return (
    <article
      className={
        styles["todo-item"] +
        " " +
        styles[`priority-${todo.data.priority}`] +
        " " +
        (todo.data.isCompleted ? styles[`completed`] : "")
      }
    >
      <div className={styles["todo-actions"]}>
        <img
          className={styles["edit-button"]}
          src={editIconImage}
          alt="edit button"
          onClick={() => addEditTodoFormToDisplay(todo.id)}
        />
        <img
          className={styles["delete-button"]}
          src={deleteIconImage}
          alt="delete button"
          onClick={() => deleteTodo(todo.id)}
        />
      </div>
      <div className={styles["todo-info"]}>
        <div className={styles["todo-data"]} data-type="title">
          <div className={styles["todo-data-type"]}>Title:</div>
          <div className={styles["todo-data-value"]}>{todo.data.title}</div>
        </div>
        <div className={styles["todo-data"]} data-type="time-left">
          <div className={styles["todo-data-type"]}>Time Left:</div>
          <div className={styles["todo-data-value"]}>{timeLeft}</div>
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
            {todo.data.isCompleted !== true ? "Pending" : "Completed"}
          </div>
        </div>
        <div>
          <button
            className={styles["toggle-completed-status-button"]}
            onClick={() => {
              toggleCompletedStatus(todo.id);
            }}
          >
            {todo.data.isCompleted !== true
              ? "Mark as completed"
              : "Mark as pending"}
          </button>
        </div>
      </div>
    </article>
  );
}

function TodoDisplay({ parentProjectId }) {
  const user = useCurrentUser();
  const todos = useTodos(user, parentProjectId === "all", parentProjectId);
  const [formData, setFormData] = useState({});

  function removeFormFromDisplay() {
    setFormData({});
  }

  async function addNewTodoFormToDisplay() {
    if (user === null) {
      await loginAnonymously();
    }
    setFormData(FormDataFactory("add"));
  }

  function addEditTodoFormToDisplay(id) {
    setFormData(FormDataFactory("edit", todos[id]));
  }

  function toggleCompletedStatus(id) {
    const todo = {
      id: todos[id].id,
      data: { ...todos[id].data, isCompleted: !todos[id].data.isCompleted },
    };

    publish(EDIT_TODO, {
      user,
      todo,
    });
  }

  function deleteTodo(id) {
    const todo = todos[id];
    publish(DELETE_TODO, {
      user,
      todo,
    });
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
              <TodoItem
                todo={todo}
                key={todoKey}
                addEditTodoFormToDisplay={addEditTodoFormToDisplay}
                toggleCompletedStatus={toggleCompletedStatus}
                deleteTodo={deleteTodo}
              />
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
