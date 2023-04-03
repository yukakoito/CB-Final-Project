import styled from "styled-components";
import Recipes from "../components/Recipes";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import NoSavedRecipeMsg from "../components/NoSavedRecipeMsg";

const MyFavorites = () => {
  const { favoriteRecipes } = useContext(UserContext);
  return (
    <Wrapper>
      <h1>My Favorite Recipes</h1>
      <Recipes recipes={favoriteRecipes} notes={true} isSavedRecipe={true} />
      {favoriteRecipes.length === 0 && <NoSavedRecipeMsg />}
    </Wrapper>
  );
};

export default MyFavorites;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
