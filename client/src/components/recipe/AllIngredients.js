import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import IconButton from "../IconButton";
import { HiOutlineViewList } from "react-icons/hi";
import RecipeIngredient from "./RecipeIngredient";
import { UserContext } from "../../contexts/UserContext";

const AllIngredients = ({ recipe }) => {
  const { pantry } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const { ingredients } = recipe;
  const [itemCount, setItemCount] = useState(0);
  const [availableIngredients, setAvailableIngredients] = useState([]);

  const checkAvailableIngredients = () => {
    const ingredientsInPantry = [];
    ingredients.forEach((ingredient) => {
      const ingredientInPantry = pantry.find(
        (item) =>
          item.name.trim().toLowerCase() ===
          ingredient.food.trim().toLowerCase()
      );
      ingredientInPantry && ingredientsInPantry.push(ingredientInPantry);
    });
    setAvailableIngredients(ingredientsInPantry);
    setItemCount(ingredientsInPantry.length);
  };

  useEffect(() => {
    checkAvailableIngredients();
  }, [pantry]);

  return (
    <Wrapper>
      <Header>
        <div>
          <h3>All Ingredients ({ingredients.length})</h3>
          <IconButton onClickFunc={setIsOpen} data={!isOpen}>
            <HiOutlineViewList size={30} />
          </IconButton>
        </div>
        {pantry.length > 0 && <span>You have {itemCount} ingredient(s)</span>}
      </Header>
      {isOpen && (
        <IngredientContainer>
          {ingredients.map((ingredient, i) => (
            <RecipeIngredient
              key={`${recipe._id}-${i + 100}`}
              ingredient={ingredient}
              availableIngredients={availableIngredients}
            />
          ))}
        </IngredientContainer>
      )}
    </Wrapper>
  );
};

export default AllIngredients;

const Wrapper = styled.div``;
const Header = styled.div`
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }

  span {
    font-size: smaller;
    font-weight: lighter;
    margin-top: 10px;
  }
`;
const IngredientContainer = styled.ul`
  overflow: scroll;
  max-height: 250px;
  border-top: 1px solid lightgray;
`;
