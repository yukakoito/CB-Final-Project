import styled from "styled-components";
import Recipe from "./Recipe";

const Recipes = ({recipes}) => {
  
  return recipes && (
    <Wrapper>
      {recipes.map(recipe => 
        <Recipe key={recipe.label} recipe={recipe}/>
        )}
    </Wrapper>
  )
}

export default Recipes;

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
`