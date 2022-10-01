import styled from "styled-components";
import ItemList from "./ItemList";

const ShoppingList = ({data}) => {

  return (
    <Wrapper>
      <h1>Shopping List</h1>
      <ItemList data={data} listName='shoppingList'/>
    </Wrapper>
  )
}

export default ShoppingList;

const Wrapper = styled.div`
  border: 1px solid lightgray;
`