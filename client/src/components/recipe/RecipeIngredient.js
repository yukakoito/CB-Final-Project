import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import IngredientActionBar from "./IngredientActionBar";
import { UserContext } from "../../contexts/UserContext";

const RecipeIngredient = ({ ingredient, availableIngredients }) => {
  const [isInPantry, setIsInPantry] = useState(false);
  const [isInShoppingList, setIsInShoppingList] = useState(false);
  const { pantry, shoppingList, userId } = useContext(UserContext);
  const { text, food, foodCategory } = ingredient;

  const item = { name: food.toLowerCase(), category: foodCategory };

  const checkIsListed = (list) => {
    const listName = Object.keys(list)[0];
    const listItems = Object.values(list)[0];

    const isIncluded = listItems.some(
      (listItem) =>
        listItem.name.trim().toLowerCase() === food.trim().toLowerCase()
    );

    listName === "pantry"
      ? setIsInPantry(isIncluded)
      : setIsInShoppingList(isIncluded);
  };

  useEffect(() => {
    checkIsListed({ pantry: availableIngredients });
  }, [availableIngredients]);

  useEffect(() => {
    checkIsListed({ shoppingList });
  }, [shoppingList]);

  return (
    <Wrapper>
      <span>{text}</span>
      {userId && (
        <IngredientActionBar
          item={item}
          isInPantry={isInPantry}
          isInShoppingList={isInShoppingList}
        />
      )}
    </Wrapper>
  );
};

export default RecipeIngredient;

const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 1px solid lightgray;

  span {
    overflow-wrap: anywhere;
    margin-right: 5px;
  }
`;
