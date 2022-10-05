import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import Pantry from "./Pantry";
import ShoppingList from "./ShoppingList";
import SavedRecipes from "./SavedRecipes";
import Recipes from "../shared/Recipes";
import { DataContext } from "../DataContext";
import { useState } from "react";
import { FaThList } from "react-icons/fa"

const Profile = () => {
  const { pantry, shoppingList } = useContext(UserContext)
  const { recipes } = useContext(DataContext);
  const [hideSavedRecipes, setHideSavedRecipes] = useState(true);

  return (
    <Wrapper>
      
        <SideBar>
          <Pantry data={pantry} />
          <ShoppingList data={shoppingList} />
          <div>
            <h1>My Favorite Recipes</h1>
            <button onClick={() => setHideSavedRecipes(!hideSavedRecipes)}>
              <FaThList />
            </button>
          </div>
        </SideBar>
        <Recipes recipes={recipes}/>
        { !hideSavedRecipes && 
          <SavedRecipes />
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

const SideBar = styled.div`
`