import styled from "styled-components";
import ItemList from "./ItemList";

const Pantry = ({data}) => {

  return (
    <Wrapper>
      <h1>Pantry</h1>
      <ItemList data={data} listName='pantry'/>
    </Wrapper>
  )
}

export default Pantry;

const Wrapper = styled.div`
  border: 1px solid lightgray;
`