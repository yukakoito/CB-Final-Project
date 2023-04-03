import styled from "styled-components";
import logo from "../assets/logo.png";

const NoSavedRecipeMsg = () => {
  return (
    <Wrapper>
      <img src={logo} alt="logo" />
      <h3>You have no saved recipes...</h3>
    </Wrapper>
  );
};

export default NoSavedRecipeMsg;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  align-self: center;
  width: 60%;
  min-width: 300px;
  min-height: 200px;
  padding: 10px;
  box-shadow: 1px 2px 3px 3px lightgray;
  border-radius: 5px;

  img {
    opacity: 0.6;
  }
`;
