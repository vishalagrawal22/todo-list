import { SIGN_IN_WITH_GOOGLE, SIGN_OUT_USER } from "../../auth/topics";
import { useCurrentUser } from "../../auth/hooks";
import { publish } from "../../topic-manager";

function Header() {
  const user = useCurrentUser();
  return (
    <div>
      {user ? (
        <div>
          <div>{user.displayName || user.email}</div>
          <button
            onClick={() => {
              publish(SIGN_OUT_USER);
            }}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={() => {
              publish(SIGN_IN_WITH_GOOGLE);
            }}
          >
            Sign In
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
