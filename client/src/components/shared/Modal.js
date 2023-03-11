import { Dialog } from "@mui/material";
import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import LoginButton from "../authentication/login";
import IconButton from "./IconButton";
import { MdClose } from "react-icons/md";
import logo from "../../assets/logo.png";

const Modal = ({ open, closeModal }) => {
  const { userId } = useContext(UserContext);

  return (
    !userId && (
      <Dialog open={open}>
        <CloseButton>
          <IconButton onClickFunc={closeModal}>
            <MdClose />
          </IconButton>
        </CloseButton>
        <Wrapper>
          <img src={logo} />
          <p>Please sign in to save this recipe.</p>
          <LoginButton />
        </Wrapper>
      </Dialog>
    )
  );
};

export default Modal;

const Wrapper = styled.div`
  height: 350px;
  padding: 0 25px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  background-color: var(--primary-background-color);
  align-items: center;

  p {
    margin: 15px 0;
    font-size: large;
    color: white;
  }

  img {
    width: 95px;
    height: 95px;
    margin: 0 0 20px 0;
  }
`;
const CloseButton = styled.div`
  position: absolute;
  top: 5px;
  right: 0px;
`;
