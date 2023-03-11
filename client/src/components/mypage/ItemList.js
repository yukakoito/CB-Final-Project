import { useContext, useState } from "react";
import styled from "styled-components";
import { DataContext } from "../DataContext";
import Typeahead from "./Typeahead";
import Ingredient from "../shared/Ingredient";
import { UserContext } from "../UserContext";

const ItemList = ({ data, listName }) => {
  const { updateUser } = useContext(UserContext);
  const { searchRecipes } = useContext(DataContext);
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);

  const moveToPantry = (e, item) => {
    e.stopPropagation();
    updateUser({ moveToPantry: item });
  };

  const addToShoppingList = (e, item) => {
    e.stopPropagation();
    updateUser({ shoppingList: item });
  };

  return (
    data && (
      <Wrapper>
        <Typeahead data={data} listName={listName} />
        {data.length > 0 &&
          data.map((item, i) => (
            <div key={`${listName}-${item.name}`}>
              <Category
                display={
                  i === 0 || data[i].category !== data[i - 1].category
                    ? null
                    : "none"
                }
              >
                {item.category ? item.category.toUpperCase() : "OTHERS"}
              </Category>
              <Ingredient
                item={item}
                onClickFunc={updateUser}
                index={i}
                listName={listName}
                isListed={data.includes(item) ? true : false}
                onMouseEnter={() => setSelectedItemIndex(i)}
                onMouseLeave={() => setSelectedItemIndex(-1)}
                selectedItemIndex={selectedItemIndex}
              />
              {listName === "shoppingList" ? (
                <button onClick={(e) => moveToPantry(e, item)}>
                  ➕ Pantry
                </button>
              ) : (
                <>
                  <button onClick={(e) => addToShoppingList(e, item)}>
                    ➕ Shopping List
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      searchRecipes(item.name);
                    }}
                  >
                    🔍 Recipes
                  </button>
                </>
              )}
            </div>
          ))}
      </Wrapper>
    )
  );
};

export default ItemList;

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  max-width: 350px;

  button {
    margin: 5px 3px;
  }
`;

const Category = styled.p`
  display: ${(p) => p.display};
  font-weight: bold;
  padding: 15px 0 5px 0;
  border-bottom: 2px solid lightgray;
`;
