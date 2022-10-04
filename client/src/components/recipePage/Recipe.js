import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../UserContext";

const Recipe = ({recipe}) => {
  const { updateUser, savedRecipes } = useContext(UserContext);

  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return recipe && (
    <Wrapper>
      <img src={recipe.image} alt={recipe.label} />
      <h2>{recipe.label}</h2>
      <p>{recipe.source}</p>
      <p>
        <span>{recipe.cuisineType}</span>
        <span>{recipe.dishType}</span>
      </p>
      <IngredientWrapper>
      {recipe.ingredientLines && recipe.ingredientLines.map((ingredient, i) =>
      <li key={`${recipe.label}-ingredient${i}`} >{ingredient}</li>
      )}
      </IngredientWrapper>
      <button onClick={() => openInNewTab(recipe.url)}>View details</button>
      <button onClick={() => updateUser({'savedRecipes': recipe})}>{savedRecipes.includes(recipe) ? 'Delete' : 'Save'}</button>
    </Wrapper>
  )
}

export default Recipe;

const Wrapper = styled.div`
    /* width: 300px;
    height: 400px; */
`

const IngredientWrapper = styled.ul`
`