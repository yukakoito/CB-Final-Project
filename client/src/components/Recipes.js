import { useContext } from "react";
import styled from "styled-components";
import { DataContext } from "../contexts/DataContext";
import { UserContext } from "../contexts/UserContext";
import ErrorMsg from "./ErrorMsg";
import LoadingCircle from "./LoadingCircle";
import Recipe from "./recipe/Recipe";
import edamamBadge from "../assets/Edamam_Badge_Transparent.svg";

const Recipes = ({ recipes, notes, isSavedRecipe }) => {
  const { isRecipeLoading } = useContext(DataContext);
  const { isErr, errMsg } = useContext(UserContext);

  if (isErr || errMsg) return <ErrorMsg errMsg={errMsg} />;
  return (
    <Wrapper>
      {!isRecipeLoading ? (
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
              <Badge src={edamamBadge} alt="Powered by Edamam" />
            </>
          )}
        </>
      ) : (
        <LoadingCircle />
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
  position: relative;
`;

const Badge = styled.img`
  width: 150px;
  height: 25px;
  border-radius: 0;
  position: absolute;
  right: -15px;
  bottom: -30px;
`;
