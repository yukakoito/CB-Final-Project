import { useContext } from "react"
import styled from "styled-components"
import LoginButton from './authentication/login'
import LogoutButton from './authentication/logout'
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <Wrapper>
      <h1>Header</h1>
      { !isAuthenticated ?
        <LoginButton /> :
        <LogoutButton /> 
      }
    </Wrapper>
  )
}

export default Header;

const Wrapper = styled.div`
  padding: var(--wrapper-padding);
  width: 100vw;
  height: 10vh;
  background-color: #008080;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;

`