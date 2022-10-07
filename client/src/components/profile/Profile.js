import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import Pantry from "./Pantry";
import ShoppingList from "./ShoppingList";
import Recipes from "../shared/Recipes";
import { DataContext } from "../DataContext";
import { useState } from "react";
import { FaThList } from "react-icons/fa"

const Profile = () => {
  const { pantry, shoppingList, mealPlans, favoriteRecipes } = useContext(UserContext)
  const { recipes } = useContext(DataContext);
  const [hideFavoriteRecipes, setHideFavoriteRecipes] = useState(true);
  const [hideMealPlans, setHideMealPlans] = useState(true);

  return (
    <Wrapper>
      
        <Sidebar>
          <Pantry data={pantry} />
          <ShoppingList data={shoppingList} />
          <div>
            <h1>My Meal Plans</h1>
            <button onClick={() => setHideMealPlans(!hideMealPlans)}>
              <FaThList />
            </button>
          </div>
          <div>
            <h1>My Favorite Recipes</h1>
            <button onClick={() => setHideFavoriteRecipes(!hideFavoriteRecipes)}>
              <FaThList />
            </button>
          </div>
        </Sidebar>
        {recipes && 
          <RecipeWrapper>
            <h1>Meal Ideas</h1>
            <Recipes recipes={recipes} notes={false} isSavedRecipe={false} />
          </RecipeWrapper>
        }
        { !hideFavoriteRecipes && 
          <RecipeWrapper>
          <h1>My Favorite Recipes</h1>
          <Recipes recipes={favoriteRecipes} notes={true} isSavedRecipe={true} />
          </RecipeWrapper>
        }
        { !hideMealPlans && 
        <RecipeWrapper>
          <h1>My Meal Plans</h1>
          <Recipes recipes={mealPlans} notes={true} isSavedRecipe={true} />
        </RecipeWrapper>
        }
    </Wrapper>
  )
}

export default Profile;

const Wrapper = styled.div`
  padding: var(--wrapper-padding);
  min-height: 80vh;
  display: flex;
`

const Sidebar = styled.div`
`
const RecipeWrapper = styled.section`
  display: block;
`