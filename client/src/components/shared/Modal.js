import { Dialog } from "@mui/material";
import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import LoginButton from "../authentication/login";
import IconButton from "./IconButton";
import { MdClose } from "react-icons/md"

const Modal = ({open, closeModal}) => {
  const { userId } = useContext(UserContext);

  return !userId && (
    <Dialog open={open} >
       <CloseButton>
          <IconButton onClickFunc={closeModal}>
            <MdClose />
          </IconButton>
        </CloseButton>
        <Wrapper>
          <p>Please sign in to save this recipe.</p>
          <LoginButton />
        </Wrapper>
    </Dialog>
  )
}

export default Modal;

const Wrapper = styled.div`
  height: 150px;
  padding: 0 15px;
  display: flex;
  flex-flow: column;
  justify-content: center;

  p {
    margin: 15px 0;
    font-size: large;
  }

  button {
    align-self: center;
  }
`
const CloseButton = styled.div`
  position: absolute;
  top: 5px;
  right: 0px;
`