import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import Recipes from "../shared/Recipes";
import { DataContext } from "../DataContext";
import RecipeSearch from "../recipeSearch/RecipeSearch";
import ItemList from "./ItemList";
import LoadingCircle from "../shared/LoadingCircle";
import ErrorMsg from "../shared/ErrorMsg";

const MyPage = () => {
  const { pantry, shoppingList, mealPlans, favoriteRecipes, isDataLoading, isErr, errMsg } = useContext(UserContext);
  const { recipes, pageDisplay, setPageDisplay, dataErr, dataErrMsg } = useContext(DataContext);

  if(isErr || errMsg || dataErr) {
    return (
      <ErrWrapper>
        <ErrorMsg errMsg={errMsg}/>
      </ErrWrapper>
    )
  }

  // Close recipe search error message after 10 seconds if no other search is in process
  // setTimeout(() => {
  //   if(dataErrMsg && !recipes && !isDataLoading) {
  //     setPageDisplay({...pageDisplay, results: false})
  //   }
  // }, [10000])
  
  return (
    <Wrapper>
      <ListWrapper>
        { pageDisplay.search &&
          <SearchField >
            <h1>Search New Recipes</h1>
            <RecipeSearch />
          </SearchField>
        }
        { pageDisplay.pantry && 
          <Container>
            <h1>My Pantry</h1>
            { !isDataLoading ? 
              <ItemList data={pantry} listName='pantry'/> :
              <LoadingCircle />
            }
          </Container>
        }
        { pageDisplay.shoppingList && 
          <Container>
            <h1>My Shopping List</h1>
            { !isDataLoading ? 
              <ItemList data={shoppingList} listName='shoppingList'/> :
              <LoadingCircle />
            }
          </Container>
        }
      </ListWrapper>
      <RecipeWrapper >
        { pageDisplay.meals && 
          <Container style={{'width': !pageDisplay.pantry && !pageDisplay.shoppingList ? '100%' : null}}>
            <h1>My Meals</h1>
            { !isDataLoading ? 
              <Recipes recipes={mealPlans} notes={true} isSavedRecipe={true} /> :
              <LoadingCircle />
            }
          </Container>
        }
        { pageDisplay.favorites && 
          <Container style={{'width': !pageDisplay.pantry && !pageDisplay.shoppingList ? '100%' : null}}>
            <h1>My Favorites</h1>
            { !isDataLoading ? 
              <Recipes recipes={favoriteRecipes} notes={true} isSavedRecipe={true} /> :
              <LoadingCircle />
            }
          </Container>
        }
        { pageDisplay.results && 
          <Container style={{'width': !pageDisplay.pantry && !pageDisplay.shoppingList ? '100%' : null}}>
            <h1>20 Matching Results</h1>
            { !isDataLoading ? 
              <>
                <Recipes recipes={recipes} notes={false} isSavedRecipe={false} />
                { dataErrMsg && <ErrorMsg errMsg={dataErrMsg}/> }
              </> :
              <LoadingCircle /> 
            }
          </Container>
        }
      </RecipeWrapper>
    </Wrapper>
  )
}

export default MyPage;

const ErrWrapper = styled.div`
  grid-column-start: 2;
  width: 90%;
  justify-self: center;
`
const Wrapper = styled.div`
  grid-column-start: 2;
  width: 100%;
  display: flex;
  flex-flow: column;

  h1 {
    margin-bottom: 10px;
  }

  @media screen and (min-width: 600px){
    margin-left: 25px;
  }

  @media screen and (min-width: 900px){
    flex-flow: row;
  }
`

const ListWrapper = styled.section`
  margin: 0 5px;
`

const RecipeWrapper = styled.section`
  margin: 0 5px;
`
const Container = styled.div`
  padding: 10px;
  margin-bottom: 15px;
  height: fit-content;
  border-radius: 15px;
  box-shadow: 1px 2px 3px 3px lightgray;

  @media screen and (min-width: 900px){
    width: 300px;
  }

`
const SearchField = styled.div`
  padding: 10px;
  margin-bottom: 15px;
  height: fit-content;
  border-radius: 15px;
  box-shadow: 1px 2px 3px 3px lightgray;
  
  @media screen and (min-width: 600px){
    display: none;
  }
`