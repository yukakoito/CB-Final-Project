import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import logo from "../../assets/logo.png";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Wrapper>
      <h1>Welcome to ZeroWasteCooking</h1>
      <div>
        <img src={logo} alt="logo" />
        <p>Sign in to search recipes and plan your meals.</p>
        <Button onClick={() => loginWithRedirect()}>Sign in</Button>
      </div>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 0 20px;
  gap: 10px;
  text-align: center;

  div {
    box-shadow: var(--container-box-shadow);
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    gap: 25px;
    padding: 15px;
    border-radius: 5px;
  }

  img {
    width: 200px;
    height: 200px;
  }
`;

const Button = styled.button`
  padding: 5px;
  width: 150px;
  margin: 5px;
  background-color: white;
  outline: none;
  color: var(--primary-color);
  border: none;
  font-weight: bold;
  box-shadow: var(--button-box-shadow);

  &:hover {
    background-color: white;
    outline: none;
    font-weight: bold;
    scale: 1.1;
  }
`;
