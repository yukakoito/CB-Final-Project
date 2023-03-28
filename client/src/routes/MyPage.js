import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Recipes from "../components/Recipes";
import { DataContext } from "../contexts/DataContext";
import RecipeSearch from "../components/recipeSearch/RecipeSearch";
import LoadingCircle from "../components/LoadingCircle";
import ErrorMsg from "../components/ErrorMsg";

const MyPage = () => {
  const { isDataLoading, isErr, errMsg } = useContext(UserContext);
  const { recipes, isRecipeLoading, dataErr, dataErrMsg } =
    useContext(DataContext);

  if (isErr || errMsg || dataErr || dataErrMsg) {
    return <ErrorMsg errMsg={errMsg || dataErrMsg} />;
  }

  return (
    <Wrapper>
      <SearchField>
        <h1>Search New Recipes</h1>
        {isDataLoading ? <LoadingCircle /> : <RecipeSearch />}
      </SearchField>
      {isRecipeLoading ? <LoadingCircle /> : <Recipes recipes={recipes} />}
    </Wrapper>
  );
};

export default MyPage;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  position: relative;
`;

const SearchField = styled.div`
  margin-bottom: 15px;
  height: fit-content;
  border-radius: 15px;
`;
