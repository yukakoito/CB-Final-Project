import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { DataContext } from "../DataContext";
import IconButton from "../shared/IconButton";
import { GiShoppingBag } from "react-icons/gi";
import { RiFridgeFill, RiDeleteBin2Fill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";

const ListActionBar = ({ item, listName }) => {
  const { updateUser } = useContext(UserContext);
  const { searchRecipes } = useContext(DataContext);
  const iconSize = 30;

  const moveToPantry = (item) => {
    updateUser({ moveToPantry: item });
  };

  const addToShoppingList = (item) => {
    updateUser({ shoppingList: item });
  };

  return (
    <Wrapper>
      {listName === "pantry" && (
        <IconButton
          onClickFunc={searchRecipes}
          data={item.name}
          title={"Search Recipes"}
        >
          <FaSearch size={iconSize} />
        </IconButton>
      )}
      {listName === "shoppingList" ? (
        <IconButton
          onClickFunc={moveToPantry}
          data={item}
          title={"Add to Pantry"}
        >
          <RiFridgeFill size={iconSize} />
        </IconButton>
      ) : (
        <IconButton
          onClickFunc={addToShoppingList}
          data={item}
          title={"Add to Shopping List"}
        >
          <GiShoppingBag size={iconSize} />
        </IconButton>
      )}
      <IconButton
        onClickFunc={updateUser}
        data={{
          [listName]: { name: item.name, category: item.category },
        }}
        title={"Delete"}
      >
        <RiDeleteBin2Fill size={iconSize} />
      </IconButton>
    </Wrapper>
  );
};

export default ListActionBar;

const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;
