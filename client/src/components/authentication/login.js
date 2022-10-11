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
    background-color: var(--primary-color);
    outline: 1px solid var(--primary-color);
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