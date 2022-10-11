import styled from "styled-components"
import LoginButton from './authentication/login'
import LogoutButton from './authentication/logout'
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <Wrapper>
      <h1>ZeroWasteCooking</h1>
      { !isAuthenticated ?
        <LoginButton /> :
        <LogoutButton /> 
      }
    </Wrapper>
  )
}

export default Header;

const Wrapper = styled.div`
  background-color: var(--primary-background-color);
  width: 100vw;
  height: 10vh;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 5vw;

  h1 {
    font-weight: bolder;
    font-size: xx-large;
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