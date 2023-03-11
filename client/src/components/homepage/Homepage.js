import { useContext } from "react";
import styled from "styled-components";
import { DataContext } from "../DataContext";
import RecipeSearch from "../recipeSearch/RecipeSearch";
import ErrorMsg from "../shared/ErrorMsg";
import LoadingCircle from "../shared/LoadingCircle";
import Recipes from "../shared/Recipes";
import { UserContext } from "../UserContext";

const Homepage = () => {
  const { recipes, dataErr, dataErrMsg } = useContext(DataContext);
  const { isDataLoading } = useContext(UserContext);

  return (
    <Wrapper>
      <SearchField>
        <h1>Welcome to ZeroWasteCooking</h1>
        <p>Sign in to save recipes and plan your meals.</p>
        <div>{!isDataLoading ? <RecipeSearch /> : <LoadingCircle />}</div>
      </SearchField>
      {dataErr || dataErrMsg ? (
        <ErrorMsg errMsg={dataErrMsg} />
      ) : (
        <Recipes recipes={recipes} style={{ justifyContent: "center" }} />
      )}
    </Wrapper>
  );
};

export default Homepage;

const Wrapper = styled.div`
  grid-column-start: 2;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;

  @media screen and (min-width: 600px) {
    margin-left: 25px;
  }
`;
const SearchField = styled.section`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin-bottom: 20px;

  p {
    margin: 10px 0;
  }
`;
