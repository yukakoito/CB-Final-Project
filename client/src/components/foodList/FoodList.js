import styled from "styled-components";
import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { HiPlusSm } from "react-icons/hi";
import IconButton from "../IconButton";
import Food from "./Food";

const FoodList = ({ data, listName }) => {
  const [input, setInput] = useState("");
  const { updateUser } = useContext(UserContext);

  // This function is to add an ingredient to pantry or shoppingList
  const addNewItem = () => {
    updateUser({
      [listName]: { name: input.trim().toLowerCase(), category: null },
    });
    // Clear input upon selection of an item
    setInput("");
  };

  return (
    data && (
      <Wrapper>
        <InputArea>
          <input
            type="text"
            placeholder="Add ingredient"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <IconButton onClickFunc={addNewItem} disabled={input ? false : true}>
            <HiPlusSm size={24} />
          </IconButton>
        </InputArea>
        <ul>
          {data.length > 0 &&
            data.map((item, index) => (
              <Food
                key={`${listName}-${item.name}`}
                data={data}
                item={item}
                index={index}
                listName={listName}
              />
            ))}
        </ul>
      </Wrapper>
    )
  );
};

export default FoodList;

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  max-height: calc(100vh - 95px);

  ul {
    width: 100%;
    padding: 0;
    overflow: scroll;
    margin-top: 10px;
  }
`;

const InputArea = styled.div`
  width: 95%;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto 5px;

  input {
    margin: 0;
  }
`;
