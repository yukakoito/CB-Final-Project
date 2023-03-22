import styled from "styled-components";
import { DataContext } from "../DataContext";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import Ingredient from "../shared/Ingredient";
import { HiPlusSm } from "react-icons/hi";

const Typeahead = ({ listName, data }) => {
  const { ingredients } = useContext(DataContext);
  const { updateUser } = useContext(UserContext);
  const [input, setInput] = useState("");
  const [hideList, setHideList] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);

  // Create a list of matched ingredients based on user input
  const suggestions =
    ingredients && input
      ? ingredients.filter((ingredient) =>
          ingredient.name.toLowerCase().includes(input.toLowerCase())
        )
      : null;

  // This function is to add a selected item to user's pantry or shoppingList
  const handleSelect = (obj) => {
    // Call this function to update the user data
    updateUser(obj);
    // Clear input upon selection of an item
    setInput("");
  };

  // This function is to add a new ingredient, that's not included in the ingredients collection, to pantry or shoppingList
  const addNewItem = () => {
    updateUser({ [listName]: { name: input.toLowerCase(), category: null } });
    // Clear input upon selection of an item
    setInput("");
  };

  return (
    <Wrapper>
      <InputArea>
        <input
          type="text"
          placeholder="🔍 Add ingredients"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setHideList(false);
          }}
          onKeyDown={(e) => {
            switch (e.key) {
              case "Enter":
                if (selectedItemIndex > -1) {
                  handleSelect({
                    [listName]: {
                      name: suggestions[selectedItemIndex].name,
                      category: suggestions[selectedItemIndex].category,
                    },
                  });
                }
                return;
              case "ArrowUp":
                if (
                  selectedItemIndex > 0 &&
                  input.length >= 2 &&
                  suggestions.length !== 0
                ) {
                  setSelectedItemIndex(selectedItemIndex - 1);
                }
                return;
              case "ArrowDown":
                if (
                  selectedItemIndex < suggestions.length - 1 &&
                  input.length >= 2 &&
                  suggestions.length !== 0
                ) {
                  setSelectedItemIndex(selectedItemIndex + 1);
                }
                return;
              case "Escape":
                setHideList(true);
                return;
            }
          }}
        />
        <button onClick={() => addNewItem()} disabled={input ? false : true}>
          <HiPlusSm size={24} />
        </button>
      </InputArea>
      {suggestions &&
        input.length >= 2 &&
        suggestions.length > 0 &&
        !hideList &&
        suggestions.map((suggestion, i) => (
          <Ingredient
            key={`search-${suggestion._id}`}
            item={suggestion}
            onClickFunc={handleSelect}
            onMouseEnter={() => setSelectedItemIndex(i)}
            onMouseLeave={() => setSelectedItemIndex(-1)}
            selectedItemIndex={selectedItemIndex}
            index={i}
            listName={listName}
            isListed={data.includes(suggestion) ? true : false}
          />
        ))}
    </Wrapper>
  );
};

export default Typeahead;

const Wrapper = styled.div`
  width: 95%;
`;

const InputArea = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: fit-content;

  input {
    margin: 5px;
  }

  button {
    outline: none;
    width: 24px;
    height: 24px;
    text-align: center;
    padding: 0;
    margin: 0;

    /* background-color: antiquewhite; */

    &:hover {
      outline: 2px solid var(--primary-color);
    }
  }
`;
