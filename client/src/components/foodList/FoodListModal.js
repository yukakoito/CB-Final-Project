import { Dialog } from "@mui/material";
import styled from "styled-components";
import IconButton from "../IconButton";
import { MdClose } from "react-icons/md";
import FoodList from "./FoodList";

const styles = {
  sx: {
    position: "absolute",
    left: "0%",
    margin: 0,
    maxHeight: "none",
    height: "100%",
    borderRadius: 0,
    maxWidth: "425px",
    width: "90%",
  },
};

const FoodListModal = ({ open, handleClose, data, listName, text }) => {
  return (
    <Dialog open={open} PaperProps={styles}>
      <Wrapper>
        <CloseButton>
          <IconButton className="close-button" onClickFunc={handleClose}>
            <MdClose />
          </IconButton>
        </CloseButton>
        <Container>
          <h1>{text}</h1>
          <FoodList data={data} listName={listName} />
        </Container>
      </Wrapper>
    </Dialog>
  );
};

export default FoodListModal;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  padding-left: 10px;
  display: flex;
  flex-flow: column;
  align-items: center;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 5px;
  right: 0px;
`;

const Container = styled.div`
  width: 100%;
  margin-top: 35px;
`;
