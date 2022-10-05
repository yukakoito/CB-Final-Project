import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import Recipes from "../shared/Recipes";

const SavedRecipes = () => {
  const { savedRecipes } = useContext(UserContext);

  return (
    <Wrapper>
      {/* <h1>My Favorite Recipes</h1> */}
      <Recipes recipes={savedRecipes} />
    </Wrapper>
  ) 
}

export default SavedRecipes;

const Wrapper = styled.div`
`