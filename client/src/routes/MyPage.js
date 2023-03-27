import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Recipes from "../components/Recipes";
import { DataContext } from "../contexts/DataContext";
import RecipeSearch from "../components/recipeSearch/RecipeSearch";
import ItemList from "../components/itemList/ItemList";
import LoadingCircle from "../components/LoadingCircle";
import ErrorMsg from "../components/ErrorMsg";
import logo from "../assets/logo.png";

const MyPage = () => {
  const {
    pantry,
    shoppingList,
    mealPlans,
    favoriteRecipes,
    isDataLoading,
    isErr,
    errMsg,
  } = useContext(UserContext);
  const { recipes, pageDisplay, isRecipeLoading, dataErr, dataErrMsg } =
    useContext(DataContext);

  if (isErr || errMsg || dataErr) {
    return <ErrorMsg errMsg={errMsg} />;
  }

  return (
    <Wrapper>
      {Object.values(pageDisplay).every((ele) => ele === false) && (
        <BackgroundImg />
      )}
      <ListWrapper>
        {pageDisplay.search && (
          <SearchField>
            <h1>Search New Recipes</h1>
            <RecipeSearch />
          </SearchField>
        )}
        {pageDisplay.pantry && (
          <Container>
            <h1>My Pantry</h1>
            {!isDataLoading ? (
              <ItemList data={pantry} listName="pantry" />
            ) : (
              <LoadingCircle />
            )}
          </Container>
        )}
        {pageDisplay.shoppingList && (
          <Container>
            <h1>My Shopping List</h1>
            {!isDataLoading ? (
              <ItemList data={shoppingList} listName="shoppingList" />
            ) : (
              <LoadingCircle />
            )}
          </Container>
        )}
      </ListWrapper>
      <RecipeWrapper>
        {pageDisplay.meals && (
          <Container
            style={{
              width:
                !pageDisplay.pantry && !pageDisplay.shoppingList
                  ? "100%"
                  : null,
            }}
          >
            <h1>My Meals</h1>
            <Recipes recipes={mealPlans} notes={true} isSavedRecipe={true} />
          </Container>
        )}
        {pageDisplay.favorites && (
          <Container
            style={{
              width:
                !pageDisplay.pantry && !pageDisplay.shoppingList
                  ? "100%"
                  : null,
            }}
          >
            <h1>My Favorites</h1>
            <Recipes
              recipes={favoriteRecipes}
              notes={true}
              isSavedRecipe={true}
            />
          </Container>
        )}
        {pageDisplay.results && (
          <Container
            style={{
              width:
                !pageDisplay.pantry && !pageDisplay.shoppingList
                  ? "100%"
                  : null,
            }}
          >
            {isRecipeLoading ? (
              <h1>Searching Recipes...</h1>
            ) : (
              <h1>{recipes ? recipes.length : 0} Matching Results</h1>
            )}
            <Recipes recipes={recipes} notes={false} isSavedRecipe={false} />
            {dataErrMsg && <ErrorMsg errMsg={dataErrMsg} />}
          </Container>
        )}
      </RecipeWrapper>
    </Wrapper>
  );
};

export default MyPage;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  position: relative;

  h1 {
    margin-bottom: 10px;
  }

  @media screen and (min-width: 900px) {
    flex-flow: row;
  }
`;

const BackgroundImg = styled.div`
  width: 90%;
  height: 100%;
  opacity: 0.3;
  background-image: url(${logo});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  position: absolute;
  z-index: -1;
`;

const ListWrapper = styled.section`
  margin: 0 5px;
`;

const RecipeWrapper = styled.section`
  margin: 0 5px;
`;
const Container = styled.div`
  padding: 10px 0 10px 10px;
  margin-bottom: 15px;
  height: fit-content;
  border-radius: 15px;
  box-shadow: 1px 2px 3px 3px lightgray;

  @media screen and (min-width: 900px) {
    width: 300px;
  }
`;
const SearchField = styled.div`
  padding: 10px;
  margin-bottom: 15px;
  height: fit-content;
  border-radius: 15px;
  box-shadow: 1px 2px 3px 3px lightgray;

  @media screen and (min-width: 600px) {
    display: none;
  }
`;
