import styled from "styled-components";
import ItemList from "./ItemList";
import { FaThList } from "react-icons/fa"
import { useState, useContext } from "react";
import { UserContext } from "../UserContext";

const ShoppingList = ({data}) => {
  const [hideShoppingList, setHideShoppingList] = useState(true);
  const { isAuthenticated } = useContext(UserContext);

  return (
    <Wrapper>
      <Title>
        <h1>My Shopping List</h1>
        <button onClick={() => setHideShoppingList(!hideShoppingList)}
                disabled={isAuthenticated? false : true}
        >
          <FaThList />
        </button>
      </Title>
      { !hideShoppingList &&
      <ItemList data={data} listName='shoppingList'/>
      }
    </Wrapper>
  )
}

export default ShoppingList;

const Wrapper = styled.div`
  border: 1px solid lightgray;
  width: 300px;
  padding: 5px 10px;
`
const Title = styled.section`
  display: inline-flex;
`