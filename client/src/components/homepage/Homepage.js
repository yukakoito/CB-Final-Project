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

  if (dataErr || dataErrMsg) {
    return (
      <ErrorWrapper>
        <ErrorMsg errMsg={dataErrMsg} />
      </ErrorWrapper>
    );
  }

  return (
    <Wrapper>
      <SearchField>
        <h1>Welcome to ZeroWasteCooking</h1>
        <p>Sign in to save recipes and plan your meals.</p>
        <div>{!isDataLoading ? <RecipeSearch /> : <LoadingCircle />}</div>
      </SearchField>
      <Recipes recipes={recipes} style={{ justifyContent: "center" }} />
    </Wrapper>
  );
};

export default Homepage;

const ErrorWrapper = styled.div`
  width: 100%;
  height: 100%;
  grid-column-start: 2;
  margin: 0 auto;
  border: 1px solid blue;
  padding-top: 10%;
`;

const Wrapper = styled.div`
  grid-column-start: 2;
  width: 100%;
  width: calc(100% - 200px - 10px);
  display: flex;
  flex-flow: column nowrap;

  @media screen and (max-width: 600px) {
    width: calc(100% - 35px - 10px);
  }
`;
const SearchField = styled.section`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  text-align: center;
  align-items: center;
  padding-top: 10px;

  p {
    margin: 10px 0;
  }
`;
