import { useEffect, useState, useRef } from "react";
import googleAuthStyles from "../google-auth-styles.module.css";
import formStyles from "../form-styles.module.css";
import { publish, subscribe, unsubscribe } from "../../topic-manager";
import {
  AUTH_SIGNUP_ERROR,
  SIGNUP_WITH_EMAIL,
  SIGNUP_WITH_GOOGLE,
} from "../../auth/topics";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const confirmPasswordInput = useRef();

  useEffect(() => {
    const token = subscribe(AUTH_SIGNUP_ERROR, (topic, { error }) => {
      setError(error);
    });
    return () => unsubscribe(token);
  }, []);

  function signupWithEmail(event) {
    event.preventDefault();
    if (password === confirmPassword) {
      publish(SIGNUP_WITH_EMAIL, { email, password });
    } else {
      confirmPasswordInput.current.setCustomValidity("password does not match");
    }
  }

  function signupWithGoogle(event) {
    event.preventDefault();
    publish(SIGNUP_WITH_GOOGLE);
  }
  return (
    <form onSubmit={signupWithEmail} className={formStyles["form"]}>
      <div
        className={`${googleAuthStyles["google-btn"]} ${googleAuthStyles["flex-child-vertical-center"]}`}
        onClick={signupWithGoogle}
      >
        <div className={googleAuthStyles["google-icon-wrapper"]}>
          <img
            className={googleAuthStyles["google-icon"]}
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="google-icon"
          />
        </div>
        <p className={googleAuthStyles["btn-text"]}>
          <b>Sign Up with Google</b>
        </p>
      </div>
      <label className={formStyles["label"]} htmlFor="signup-email">
        Email:{" "}
      </label>
      <input
        className={formStyles["text-input"]}
        type="email"
        id="signup-email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        required
      />
      <label className={formStyles["label"]} htmlFor="signup-password">
        Password:{" "}
      </label>
      <input
        className={formStyles["text-input"]}
        type="password"
        id="signup-password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        minLength="6"
        required
      />
      <label className={formStyles["label"]} htmlFor="signup-confirm-password">
        Confirm Password:{" "}
      </label>
      <input
        className={formStyles["text-input"]}
        type="password"
        id="signup-confirm-password"
        ref={confirmPasswordInput}
        value={confirmPassword}
        onChange={(event) => {
          setConfirmPassword(event.target.value);
        }}
        minLength="6"
        required
      />
      <button className={formStyles["submit"]}>Sign Up</button>
      <span className={formStyles["error"]}>{error}</span>
    </form>
  );
}

export default SignupForm;
