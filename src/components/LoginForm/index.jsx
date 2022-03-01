import { useEffect, useState } from "react";
import googleAuthStyles from "../google-auth-styles.module.css";
import formStyles from "../form-styles.module.css";
import { subscribe, unsubscribe } from "../../topic-manager";
import {
  AUTH_LOGIN_ERROR,
  LOGIN_WITH_EMAIL,
  LOGIN_WITH_GOOGLE,
} from "../../auth/topics";
import { publish } from "../../topic-manager";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = subscribe(AUTH_LOGIN_ERROR, (topic, { error }) => {
      setError(error);
    });
    return () => unsubscribe(token);
  }, []);

  function signInWithEmail(event) {
    event.preventDefault();
    publish(LOGIN_WITH_EMAIL, { email, password });
  }

  function signInWithGoogle(event) {
    event.preventDefault();
    publish(LOGIN_WITH_GOOGLE);
  }

  return (
    <form onSubmit={signInWithEmail} className={formStyles["form"]}>
      <div
        className={`${googleAuthStyles["google-btn"]} ${googleAuthStyles["flex-child-vertical-center"]}`}
        onClick={signInWithGoogle}
      >
        <div className={googleAuthStyles["google-icon-wrapper"]}>
          <img
            className={googleAuthStyles["google-icon"]}
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="google-icon"
          />
        </div>
        <p className={googleAuthStyles["btn-text"]}>
          <b>Login with Google</b>
        </p>
      </div>
      <label className={formStyles["label"]} htmlFor="login-email">
        Email:{" "}
      </label>
      <input
        className={formStyles["text-input"]}
        type="email"
        id="login-email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        required
      />
      <label className={formStyles["label"]} htmlFor="login-password">
        Password:{" "}
      </label>
      <input
        className={formStyles["text-input"]}
        type="password"
        id="login-password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        minLength="6"
        required
      />
      <button className={formStyles["submit"]}>Login</button>
      <span className={formStyles["error"]}>{error}</span>
    </form>
  );
}

export default LoginForm;
