import { useContext } from "react";
import styled from "styled-components";
import { DataContext } from "../contexts/DataContext";
import { UserContext } from "../contexts/UserContext";
import ErrorMsg from "./ErrorMsg";
import LoadingCircle from "./LoadingCircle";
import Recipe from "./recipe/Recipe";

const Recipes = ({ recipes, notes, isSavedRecipe }) => {
  const { isRecipeLoading } = useContext(DataContext);
  const { isErr, errMsg } = useContext(UserContext);

  if (isErr || errMsg) return <ErrorMsg errMsg={errMsg} />;

  return (
    <Wrapper>
      {!isRecipeLoading ? (
        recipes &&
        recipes.map((recipe, i) => (
          <Recipe
            key={`${recipe.label}-${i}`}
            recipe={recipe}
            notes={notes}
            isSavedRecipe={isSavedRecipe}
          />
        ))
      ) : (
        <LoadingCircle />
      )}
    </Wrapper>
  );
};

export default Recipes;

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-flow: row wrap;
  justify-items: flex-start;
  gap: 10px;
  margin-bottom: 10px;
`;
