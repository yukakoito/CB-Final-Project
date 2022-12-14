import styled from "styled-components";
import { GiMeal, GiShoppingBag } from "react-icons/gi"
import { BsSuitHeartFill, BsFillArrowUpSquareFill } from "react-icons/bs"
import { RiFridgeFill } from "react-icons/ri"
import { FaSearch } from "react-icons/fa"
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { DataContext } from "./DataContext";
import RecipeSearch from "./recipeSearch/RecipeSearch";
import IconButton from "./shared/IconButton";

const Sidebar = () => {
  const { userId } = useContext(UserContext)
  const { pageDisplay, setPageDisplay } = useContext(DataContext);

  const iconSize = 20

  return (
    <Wrapper>
      {userId &&
        <>
        <li onClick={() => setPageDisplay({...pageDisplay, search: !pageDisplay.search})}
            disabled={userId ? false : true}
        >
          <FaSearch size={iconSize}
                    color={userId && pageDisplay.search? '#e63946': null}
          />
          <span>New Recipes</span>
        </li>
        <div>
          { pageDisplay.search && <RecipeSearch /> }
        </div>
        </>
      }
      <li onClick={() => setPageDisplay({...pageDisplay, pantry: !pageDisplay.pantry})}>
        <RiFridgeFill size={iconSize}
                      color={userId && pageDisplay.pantry? '#e63946': null}
        />
        <span>My Pantry</span>  
      </li>
     
      <li onClick={() => setPageDisplay({...pageDisplay, shoppingList: !pageDisplay.shoppingList})}>
        <GiShoppingBag size={iconSize}
                       color={userId && pageDisplay.shoppingList? '#e63946': null}
        />
        <span>My Shopping List</span>
      </li>
     
      <li onClick={() => setPageDisplay({...pageDisplay, meals: !pageDisplay.meals})}
          disabled={userId ? false : true}
      >
        <GiMeal size={iconSize}
                color={userId && pageDisplay.meals? '#e63946': null}
        />
        <span>My Meals</span>
      </li>
      <li onClick={() => setPageDisplay({...pageDisplay, favorites: !pageDisplay.favorites})}
          disabled={userId ? false : true}
      >
        <BsSuitHeartFill size={iconSize}
                         color={userId && pageDisplay.favorites? '#e63946': null}
        />
        <span>My Favorites</span>
      </li>
      <ScrollUp>
        <IconButton onClickFunc={window.scrollTo} data={{top: 0, left: 0, behavior: 'smooth'}}>
          <BsFillArrowUpSquareFill size={iconSize}/>
        </IconButton>
      </ScrollUp>
    </Wrapper>
  )
}

export default Sidebar;

const Wrapper = styled.ul`
  grid-column-start: 1;
  display: flex;
  flex-flow: column nowrap;
  width: 185px;
  position: relative;

  @media screen and (max-width: 600px){
      width: 35px;
    }

  div {
    width: 100%;
    height: fit-content;
    @media screen and (max-width: 600px){
      display: none;
    }
  }

  li {
    display: inline-flex;
    
    &:hover {
      background-color: #edf2f4;
      font-weight: bold;
      transition: 200ms ease-in-out;
    }
  }

  span {
    text-indent: 10px;

    @media screen and (max-width: 600px){
      display: none;
    }
  }
`
const ScrollUp = styled.div`
  position: absolute;
  bottom: 0;
`