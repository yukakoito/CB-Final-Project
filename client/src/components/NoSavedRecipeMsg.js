import styled from "styled-components";
import logo from "../assets/logo.png";

const NoSavedRecipeMsg = () => {
  return (
    <Wrapper>
      <img src={logo} alt="logo" />
      <p>You have no saved recipes...</p>
    </Wrapper>
  );
};

export default NoSavedRecipeMsg;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  align-self: center;
  min-width: var(--min-container-width);
  height: var(--min-container-height);
  padding: 10px;
  box-shadow: var(--container-box-shadow);
  border-radius: 5px;
  margin-top: 10px;

  img {
    opacity: 0.6;
  }
`;
