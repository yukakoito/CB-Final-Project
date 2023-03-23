import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { DataContext } from "../../contexts/DataContext";
import IconButton from "../IconButton";
import { GiShoppingBag } from "react-icons/gi";
import { RiFridgeFill, RiDeleteBin2Fill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";

const ListActionBar = ({ item, listName }) => {
  const { updateUser, shoppingList } = useContext(UserContext);
  const { searchRecipes } = useContext(DataContext);
  const [isInShoppingList, setIsInShoppingList] = useState(false);
  const iconSize = 30;

  const moveToPantry = (item) => {
    updateUser({ moveToPantry: item });
  };

  const addToShoppingList = (item) => {
    updateUser({ shoppingList: item });
  };

  const checkIsInShoppingList = () => {
    if (listName === "shoppingList") return;
    setIsInShoppingList(
      shoppingList.some((listItem) => listItem.name === item.name)
    );
  };

  useEffect(() => {
    item && checkIsInShoppingList();
  }, [shoppingList]);

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
          title={
            isInShoppingList
              ? "Already in Shopping List"
              : "Add to Shopping List"
          }
          disabled={isInShoppingList}
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
