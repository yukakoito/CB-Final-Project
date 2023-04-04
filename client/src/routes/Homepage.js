import { useContext, useEffect } from "react";
import styled from "styled-components";
import { DataContext } from "../contexts/DataContext";
import RecipeSearch from "../components/recipeSearch/RecipeSearch";
import Recipes from "../components/Recipes";
import { UserContext } from "../contexts/UserContext";
import Login from "../components/authentication/login";

const Homepage = () => {
  const { recipes, setRecipes } = useContext(DataContext);
  const { userId, updatedRecipe } = useContext(UserContext);

  const updateRecipeStatus = () => {
    const newRecipes = recipes.map((recipe) => {
      if (recipe._id === updatedRecipe._id) {
        recipe = updatedRecipe;
      }
      return recipe;
    }, []);
    return setRecipes(newRecipes);
  };

  useEffect(() => {
    if (updatedRecipe && recipes) {
      updateRecipeStatus();
    }
  }, [updatedRecipe]);

  return (
    <Wrapper>
      {userId ? (
        <>
          <SearchField>
            <h1>Search New Recipes</h1>
            <RecipeSearch />
          </SearchField>
          <Recipes recipes={recipes} />
        </>
      ) : (
        <Login />
      )}
    </Wrapper>
  );
};

export default Homepage;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
`;

const SearchField = styled.section`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  text-align: center;
  align-items: center;

  p {
    margin: 10px 0;
  }
`;
