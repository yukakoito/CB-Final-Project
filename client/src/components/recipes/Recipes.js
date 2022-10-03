import styled from "styled-components";
import RecipeSearch from "../recipeSearch/RecipeSearch";

const Recipes = () => {
  return (
    <Wrapper>
      <h1>Recipes</h1>
      <RecipeSearch />
    </Wrapper>
  )
}

export default Recipes;

const Wrapper = styled.div`
  padding: var(--wrapper-padding);
  min-height: 80vh;
`