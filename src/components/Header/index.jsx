import { useEffect, useState } from "react";
import { publish } from "../../topic-manager";

import { useCurrentUser } from "../../auth/hooks";
import { LOGOUT_USER } from "../../auth/topics";

import Overlay from "../Overlay";
import LoginForm from "../LoginForm";
import SignupForm from "../SignupForm";

import notepadImage from "../../images/notepad.svg";
import defaultProfileImage from "../../images/default-profile-image.svg";
import styles from "./styles.module.css";

function Header() {
  const user = useCurrentUser();
  const [formType, setFormType] = useState(null);

  function removeFormFromDisplay() {
    setFormType(null);
  }

  function addLoginFormToDisplay() {
    setFormType("login");
  }

  function addSignUpFormToDisplay() {
    setFormType("signup");
  }

  useEffect(() => {
    if (user !== null) {
      removeFormFromDisplay();
    }
  }, [user]);

  if (formType === null) {
    return (
      <header className={styles["header"]}>
        <div className={styles["info"]}>
          <img className={styles["logo"]} src={notepadImage} alt="notepad" />
          <div className={styles["app-name"]}>Todo List</div>
        </div>
        {user ? (
          <div className={styles["right"]}>
            <img
              className={styles["profile-pic"]}
              src={user.photoURL || defaultProfileImage}
              alt="profile pic"
            />
            <div className={styles["user-name"]}>
              {user.displayName || user.email}
            </div>
            <button
              className={styles["btn"]}
              onClick={() => {
                publish(LOGOUT_USER);
              }}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className={styles["right"]}>
            <button className={styles["btn"]} onClick={addLoginFormToDisplay}>
              Login
            </button>
            <button className={styles["btn"]} onClick={addSignUpFormToDisplay}>
              Sign Up
            </button>
          </div>
        )}
      </header>
    );
  } else {
    return (
      <Overlay removeFormFromDisplay={removeFormFromDisplay}>
        {formType === "login" ? <LoginForm /> : <SignupForm />}
      </Overlay>
    );
  }
}

export default Header;
