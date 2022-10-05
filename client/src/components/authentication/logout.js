import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { UserContext } from "../UserContext";

const LogoutButton = () => {
  const { logout } = useAuth0();
  const { setUserId } = useContext(UserContext);

  return (
    <button onClick={() => logout({ returnTo: window.location.origin })}>
      Sign out
    </button>
  );
};

export default LogoutButton;