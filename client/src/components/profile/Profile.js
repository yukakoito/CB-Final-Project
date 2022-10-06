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
  const { pantry, shoppingList, meals, savedRecipes } = useContext(UserContext)
  const { recipes } = useContext(DataContext);
  const [hideSavedRecipes, setHideSavedRecipes] = useState(true);
  const [hideMeals, setHideMeals] = useState(true);

  return (
    <Wrapper>
      
        <Sidebar>
          <Pantry data={pantry} />
          <ShoppingList data={shoppingList} />
          <div>
            <h1>My Meal Plans</h1>
            <button onClick={() => setHideMeals(!hideMeals)}>
              <FaThList />
            </button>
          </div>
          <div>
            <h1>My Favorite Recipes</h1>
            <button onClick={() => setHideSavedRecipes(!hideSavedRecipes)}>
              <FaThList />
            </button>
          </div>
        </Sidebar>
        {recipes && 
          <RecipeWrapper>
            <h1>Meal Ideas</h1>
            <Recipes recipes={recipes} notes={false}/>
          </RecipeWrapper>
        }
        { !hideSavedRecipes && 
          <RecipeWrapper>
          <h1>My Favorite Recipes</h1>
          <Recipes recipes={savedRecipes} notes={true}/>
          </RecipeWrapper>
        }
        { !hideMeals && 
        <RecipeWrapper>
          <h1>My Meal Plans</h1>
          <Recipes recipes={meals} notes={true}/>
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