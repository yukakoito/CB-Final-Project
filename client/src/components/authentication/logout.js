import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import styled from "styled-components";

const LogoutButton = () => {
  const { logout } = useAuth0();
  const { setUserId, setRecipeToAdd } = useContext(UserContext);

  return (
    <Button onClick={() => {logout({ returnTo: window.location.origin });
                            setUserId(null);
                            setRecipeToAdd(null);
                            }
                    }
    >
      Sign out
    </Button>
  );
};

export default LogoutButton;

const Button = styled.button`
    padding: 5px 15px;
    width: 100px;
    margin: 5px;
    background-color: var(--primary-color);
    color: white;
    border: none;

    &:hover {
      opacity: 0.8;
      background-color: white;
      outline: 3px solid var(--primary-color);
      color: var(--primary-color);
      font-weight: bold;
    }
`