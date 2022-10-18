import styled from "styled-components"
import LoginButton from './authentication/login'
import LogoutButton from './authentication/logout'
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../assets/logo.png"

const Header = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <Wrapper>
      <div>
        <Logo src={logo} />
        <h1>Cooking</h1>
      </div>
      { !isAuthenticated ?
        <LoginButton /> :
        <LogoutButton /> 
      }
    </Wrapper>
  )
}

export default Header;

const Logo = styled.img`
  width: 65px;
  height: 65px;
  margin-right: 10px;
`

const Wrapper = styled.div`
  background-color: var(--primary-background-color);
  width: 100vw;
  height: 10vh;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 5vw;

  div {
    display: inline-flex;
    align-items: center;
  }

  h1 {
    font-weight: bolder;
    font-size: xx-large;
    color: white;
  }

  @media screen and (min-width: 1200px){
    padding: 20px 20vw;
  }

  @media screen and (max-width: 420px){

    h1 {
    font-size: x-large;
    }
  }
`