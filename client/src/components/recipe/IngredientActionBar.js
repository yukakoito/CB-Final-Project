import styled from "styled-components";
import IconButton from "../IconButton";
import { GiShoppingBag } from "react-icons/gi";
import { RiFridgeFill } from "react-icons/ri";
import { GoCheck } from "react-icons/go";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const IngredientActionBar = ({ item, isInPantry, isInShoppingList }) => {
  const { updateUser } = useContext(UserContext);
  const iconSize = 30;

  const addToPantry = (item) => {
    updateUser({ pantry: item });
  };

  const addToShoppingList = (item) => {
    updateUser({ shoppingList: item });
  };

  return (
    <Wraper>
      {isInPantry ? (
        <div>
          <GoCheck size={20} color={"#e63946"} />
        </div>
      ) : (
        <IconButton
          onClickFunc={addToPantry}
          data={item}
          title={isInPantry ? "" : "Add to Pantry"}
          disabled={isInPantry}
        >
          <RiFridgeFill size={iconSize} />
        </IconButton>
      )}
      <IconButton
        onClickFunc={addToShoppingList}
        data={item}
        title={
          isInShoppingList ? "Already in Shopping List" : "Add to Shopping List"
        }
        disabled={isInShoppingList}
      >
        <GiShoppingBag size={iconSize} />
      </IconButton>
    </Wraper>
  );
};

export default IngredientActionBar;

const Wraper = styled.div`
  display: inline-flex;

  div {
    width: 30px;
    height: 30px;
    margin: 0 5px;
    text-align: center;
    padding-top: 5px;
  }
`;
