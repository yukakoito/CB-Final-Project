import styled from "styled-components";
import { useState, useContext } from "react";
import { UserContext } from "../UserContext";

const Notes = ({recipe}) => {
  const {updateUser} = useContext(UserContext);
  const [input, setInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Edit notes. When 
  const editNotes = () => {
    if(!input) return setIsEditing(true);
    updateUser({notes: {_id: recipe._id, notes: input}});
    setIsEditing(false);
    setInput('');
  }

  return (
    <Wrapper>
      {!recipe.notes || isEditing ?
        <Textarea onChange={(e) => setInput(e.target.value)}
                  value={input ? input : recipe.notes}
                  placeholder={'Add notes...'}
                  rows='5'
        /> :
        <p><b>Notes:</b> {recipe.notes}</p>
      }
      <Buttons>
        {!recipe.notes && !isEditing ?
        <button onClick={() => updateUser({notes: {_id: recipe._id, notes: input}}) }>
          Add
        </button> :
        <button onClick={() => editNotes()}>
          Edit
        </button>
        }
        <button onClick={() => {updateUser({notes: {_id: recipe._id, notes: ''}});
                                setInput(''); 
                               }
                        }
        >
          Delete
        </button>
      </Buttons>
    </Wrapper>
  )
}

export default Notes;

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
`
const Textarea = styled.textarea`
  height: fit-content;
  resize: none;
  outline-color: gray;
`
const Buttons = styled.div`
  display: inline-flex;
  justify-content: flex-end;
`