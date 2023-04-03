import styled from "styled-components";
import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import IconButton from "../IconButton";
import { RiEdit2Fill } from "react-icons/ri";

const Notes = ({ recipe }) => {
  const { _id, notes } = recipe;
  const { updateUser } = useContext(UserContext);
  const [input, setInput] = useState(notes);
  const [isEditing, setIsEditing] = useState(notes ? false : true);

  const iconSize = 30;

  const handleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveInput = () => {
    updateUser({ notes: { _id: _id, notes: input } });
    input && handleIsEditing();
  };

  const handleCancelInput = () => {
    setInput(notes);
    handleIsEditing();
  };

  return (
    <Wrapper>
      <h3>Notes:</h3>
      {notes && !isEditing && (
        <TextDisplay>
          <p>{notes}</p>
          <IconButton onClickFunc={handleIsEditing}>
            <RiEdit2Fill size={iconSize} />
          </IconButton>
        </TextDisplay>
      )}
      {isEditing && (
        <TextEdit>
          <textarea
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder={notes ? input : "Add a note..."}
            rows="5"
          />
          <Buttons>
            {notes && (
              <IconButton onClickFunc={handleCancelInput}>
                <span>Cancel</span>
              </IconButton>
            )}
            <IconButton
              onClickFunc={handleSaveInput}
              disabled={notes === input ? true : false}
            >
              <span>Save</span>
            </IconButton>
          </Buttons>
        </TextEdit>
      )}
    </Wrapper>
  );
};

export default Notes;

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  max-width: 375px;
`;

const TextDisplay = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow-wrap: anywhere;
  gap: 10px;
`;

const TextEdit = styled.div`
  flex-direction: column;
  textarea {
    height: fit-content;
    resize: none;
    outline-color: gray;
    margin: 0 5px;
    padding: 5px;
  }
`;

const Buttons = styled.div`
  flex-flow: row nowrap;
  justify-content: flex-end;

  button {
    width: 65px;
    font-size: 12px;
  }
`;
