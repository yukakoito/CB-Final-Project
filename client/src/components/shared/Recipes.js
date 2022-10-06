import styled from "styled-components";
import Recipe from "./Recipe";

const Recipes = ({recipes, notes}) => {
  
  return recipes && (
    <Wrapper>
      {recipes.map((recipe,i) => 
        <Recipe key={`${recipe.label}-${i}`} recipe={recipe} notes={notes}/>
        )}
    </Wrapper>
  )
}

export default Recipes;

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  height: fit-content;
`