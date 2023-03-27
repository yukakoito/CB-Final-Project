import styled from "styled-components";
import { GiMeal, GiShoppingBag } from "react-icons/gi";
import { BsSuitHeartFill } from "react-icons/bs";
import { RiFridgeFill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import { DataContext } from "./contexts/DataContext";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { userId } = useContext(UserContext);
  const { pageDisplay, setPageDisplay } = useContext(DataContext);

  const iconSize = 20;
  const disabled = { pointerEvents: userId ? "" : "none" };

  return (
    <Wrapper>
      {userId && (
        <NavLink to="/my-page">
          <div>
            <FaSearch
              size={iconSize}
              color={userId && pageDisplay.search ? "#e63946" : null}
            />
            <span>New Recipes</span>
          </div>
        </NavLink>
      )}
      <NavLink to="/my-meal-plan" style={disabled}>
        <div>
          <GiMeal
            size={iconSize}
            color={userId && pageDisplay.meals ? "#e63946" : null}
          />
          <span>My Meal Plan</span>
        </div>
      </NavLink>
      <NavLink to="/my-favorites" style={disabled}>
        <div>
          <BsSuitHeartFill
            size={iconSize}
            color={userId && pageDisplay.favorites ? "#e63946" : null}
          />
          <span>My Favorites</span>
        </div>
      </NavLink>

      <List
        style={disabled}
        onCdivck={() =>
          setPageDisplay({ ...pageDisplay, pantry: !pageDisplay.pantry })
        }
      >
        <RiFridgeFill
          size={iconSize}
          color={userId && pageDisplay.pantry ? "#e63946" : null}
        />
        <span>My Pantry</span>
      </List>

      <List
        style={disabled}
        onClick={() =>
          setPageDisplay({
            ...pageDisplay,
            shoppingList: !pageDisplay.shoppingList,
          })
        }
      >
        <GiShoppingBag
          size={iconSize}
          color={userId && pageDisplay.shoppingList ? "#e63946" : null}
        />
        <span>My Shopping List</span>
      </List>
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
      text-decoration: underline;

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
