import styled from "styled-components";
import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const Notes = ({ recipe }) => {
  const { updateUser } = useContext(UserContext);
  const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Edit notes
  const editNotes = () => {
    if (!input) return setIsEditing(true);
    updateUser({ notes: { _id: recipe._id, notes: input } });
    setIsEditing(false);
    setInput("");
  };

  return (
    <Wrapper>
      {!recipe.notes || isEditing ? (
        <Textarea
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder={recipe.notes ? recipe.notes : "Add notes..."}
          rows="5"
        />
      ) : (
        <>
          <p>
            <b>Notes:</b>
          </p>
          <p> {recipe.notes}</p>
        </>
      )}
      <Buttons>
        {!recipe.notes && !isEditing ? (
          <button
            onClick={() =>
              updateUser({ notes: { _id: recipe._id, notes: input } })
            }
          >
            Add
          </button>
        ) : (
          <button onClick={() => editNotes()}>Edit</button>
        )}
        <button
          onClick={() => {
            updateUser({ notes: { _id: recipe._id, notes: "" } });
            setInput("");
          }}
        >
          Delete
        </button>
      </Buttons>
    </Wrapper>
  );
};

export default Notes;

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;

  p {
    margin: 3px 5px;
  }
`;
const Textarea = styled.textarea`
  height: fit-content;
  resize: none;
  outline-color: gray;
  margin: 5px;
  padding: 5px;
`;

const Buttons = styled.div`
  display: inline-flex;
  justify-content: flex-end;
  gap: 10px;
  margin-right: 5px;
  button {
    padding: 5px 10px;
    font-size: 14px;
  }
`;
