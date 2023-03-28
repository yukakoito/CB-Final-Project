import styled from "styled-components";
import { GiMeal, GiShoppingBag } from "react-icons/gi";
import { BsSuitHeartFill } from "react-icons/bs";
import { RiFridgeFill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import { NavLink } from "react-router-dom";
import FoodListModal from "./components/foodList/FoodListModal";
import { useState } from "react";

const Sidebar = () => {
  const { userId, pantry, shoppingList } = useContext(UserContext);
  const [isPantryOpen, setIsPantryOpen] = useState(false);
  const [isShoppingListOpen, setIsShoppingListOpen] = useState(false);

  const iconSize = 20;
  const disabled = { pointerEvents: userId ? "" : "none" };

  const handleClose = () => {
    setIsPantryOpen(false);
    setIsShoppingListOpen(false);
  };

  const displayPantry = () => setIsPantryOpen(true);
  const displayShoppingList = () => setIsShoppingListOpen(true);

  return (
    <Wrapper>
      {userId && (
        <NavLink to="/" end>
          <div>
            <FaSearch size={iconSize} />
            <span>New Recipes</span>
          </div>
        </NavLink>
      )}
      <NavLink to="/my-meal-plan" style={disabled}>
        <div>
          <GiMeal size={iconSize} />
          <span>My Meal Plan</span>
        </div>
      </NavLink>
      <NavLink to="/my-favorites" style={disabled}>
        <div>
          <BsSuitHeartFill size={iconSize} />
          <span>My Favorites</span>
        </div>
      </NavLink>

      <List style={disabled} onClick={() => displayPantry()}>
        <RiFridgeFill size={iconSize} />
        <span>My Pantry</span>
      </List>

      <List style={disabled} onClick={() => displayShoppingList()}>
        <GiShoppingBag size={iconSize} />
        <span>My Shopping List</span>
      </List>
      <FoodListModal
        open={isPantryOpen}
        handleClose={handleClose}
        data={pantry}
        listName="pantry"
        text="My Pantry"
      />
      <FoodListModal
        open={isShoppingListOpen}
        handleClose={handleClose}
        data={shoppingList}
        listName="shoppingList"
        text="My Shopping List"
      />
    </Wrapper>
  );
};

export default Sidebar;

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  width: 100%;
  height: 100%;

  span {
    text-indent: 10px;

    @media screen and (max-width: 600px) {
      display: none;
    }
  }

  a {
    color: var(--primary-color);
    text-decoration: none;

    div {
      display: inline-flex;
      align-items: center;
      padding: 5px;
    }

    &:hover {
      font-weight: bold;
      cursor: pointer;
    }

    &.active {
      color: #e63946;
      text-decoration: underline 2px;

      span {
        color: var(--primary-color);
      }
    }
  }
`;

const List = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 5px;

  &:hover {
    font-weight: bold;
    cursor: pointer;
  }
`;
