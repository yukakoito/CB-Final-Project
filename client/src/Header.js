import styled from "styled-components";
import LoginButton from "./components/authentication/login";
import LogoutButton from "./components/authentication/logout";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "./assets/logo.png";

const Header = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Wrapper>
      <div className="container">
        <div className="title">
          <img src={logo} alt="logo" />
          <h1>Cooking</h1>
        </div>
        {!isAuthenticated ? <LoginButton /> : <LogoutButton />}
      </div>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  background-color: var(--primary-background-color);
  width: 100%;
  height: 85px;

  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;

  .container {
    max-width: var(--max-content-width);
    width: 100%;
    margin: 0 auto;
    padding: 0 20px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .title {
    display: inline-flex;
    align-items: center;
  }

  img {
    width: 65px;
    height: 65px;
    margin-right: 10px;
  }

  h1 {
    font-weight: bolder;
    font-size: xx-large;
    color: white;
  }

  @media screen and (max-width: 420px) {
    h1 {
      font-size: x-large;
    }
  }
`;
