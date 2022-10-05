import styled from "styled-components";
import RecipeSearch from "../recipeSearch/RecipeSearch";
import Recipes from "../shared/Recipes";
import { useContext } from "react";
import { DataContext } from "../DataContext";

const RecipePage = () => {
  const { recipes } = useContext(DataContext);

  return (
    <Wrapper>
      <h1>Recipes</h1>
      <RecipeSearch />
      <Recipes recipes={recipes}/>
    </Wrapper>
  )
}

export default RecipePage;

const Wrapper = styled.div`
  padding: var(--wrapper-padding);
  min-height: 80vh;
`