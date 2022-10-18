import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button onClick={() => loginWithRedirect()}>Sign in</Button>;
};

export default LoginButton;

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
`