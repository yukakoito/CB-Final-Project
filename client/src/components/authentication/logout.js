import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import styled from "styled-components";

const LogoutButton = () => {
  const { logout } = useAuth0();
  const { setUserId, setRecipeToAdd } = useContext(UserContext);

  return (
    <Button
      onClick={() => {
        logout({ returnTo: window.location.origin });
        setUserId(null);
        setRecipeToAdd(null);
      }}
    >
      Sign out
    </Button>
  );
};

export default LogoutButton;

const Button = styled.button`
  padding: 5px;
  width: 100px;
  margin: 5px;
  background-color: white;
  outline: none;
  color: var(--primary-color);
  border: none;
  font-weight: bold;

  &:hover {
    background-color: white;
    outline: none;
    box-shadow: 1px 2px 3px 3px var(--primary-color);
    font-weight: bold;
    scale: 1.1;
  }
`;
