import { useContext } from "react";
import styled from "styled-components";
import { DataContext } from "../contexts/DataContext";
import RecipeSearch from "../components/recipeSearch/RecipeSearch";
import ErrorMsg from "../components/ErrorMsg";
import LoadingCircle from "../components/LoadingCircle";
import Recipes from "../components/Recipes";
import { UserContext } from "../contexts/UserContext";

const Homepage = () => {
  const { recipes, dataErr, dataErrMsg } = useContext(DataContext);
  const { isDataLoading, userId } = useContext(UserContext);

  if (dataErr || dataErrMsg) {
    return <ErrorMsg errMsg={dataErrMsg} />;
  }

  return (
    <Wrapper>
      <SearchField>
        {userId ? (
          <h1>Search New Recipes</h1>
        ) : (
          <>
            <h1>Welcome to ZeroWasteCooking</h1>
            <p>Sign in to save recipes and plan your meals.</p>
          </>
        )}
        <div>{!isDataLoading ? <RecipeSearch /> : <LoadingCircle />}</div>
      </SearchField>
      <Recipes recipes={recipes} />
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
