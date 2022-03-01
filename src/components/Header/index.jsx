import { useEffect, useState } from "react";
import { publish } from "../../topic-manager";

import { useCurrentUser } from "../../auth/hooks";
import { LOGOUT_USER } from "../../auth/topics";

import Overlay from "../Overlay";
import LoginForm from "../LoginForm";
import SignupForm from "../SignupForm";

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
      <div>
        {user ? (
          <div>
            <div>{user.displayName || user.email}</div>
            <button
              onClick={() => {
                publish(LOGOUT_USER);
              }}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div>
            <button onClick={addLoginFormToDisplay}>Login</button>
            <button onClick={addSignUpFormToDisplay}>Sign Up</button>
          </div>
        )}
      </div>
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
