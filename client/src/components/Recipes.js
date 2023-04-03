import { useContext } from "react";
import styled from "styled-components";
import { DataContext } from "../contexts/DataContext";
import { UserContext } from "../contexts/UserContext";
import ErrorMsg from "./ErrorMsg";
import LoadingCircle from "./LoadingCircle";
import Recipe from "./recipe/Recipe";

const Recipes = ({ recipes, notes, isSavedRecipe }) => {
  const { isRecipeLoading } = useContext(DataContext);
  const { isErr, errMsg, isDataLoading } = useContext(UserContext);

  if (isErr || errMsg) return <ErrorMsg errMsg={errMsg} />;
  return (
    <Wrapper>
      {isRecipeLoading || isDataLoading ? (
        <LoadingCircle />
      ) : (
        <>
          {recipes && (
            <>
              {recipes.map((recipe, i) => (
                <Recipe
                  key={`${recipe.label}-${i}`}
                  recipe={recipe}
                  notes={notes}
                  isSavedRecipe={isSavedRecipe}
                />
              ))}
            </>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default Recipes;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-items: flex-start;
  gap: 10px;
  margin: 10px 0 25px;
`;
