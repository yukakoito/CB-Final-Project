import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import styled from "styled-components";
import { DataContext } from "../../contexts/DataContext";

const LogoutButton = () => {
  const { logout } = useAuth0();
  const { setUserId } = useContext(UserContext);
  const { setRecipes } = useContext(DataContext);

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
    setUserId(null);
    setRecipes(null);
  };

  return <Button onClick={() => handleLogout()}>Sign out</Button>;
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
    box-shadow: var(--button-box-shadow);
    font-weight: bold;
    scale: 1.1;
  }
`;
