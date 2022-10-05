import styled from "styled-components";
import Input from "./Input";
import SearchOptions from "./SearchOptions";

const RecipeSearch = () => {

  return (
    <Wrapper>
      <Input />
      <SearchOptions />
    </Wrapper>
  )
}

export default RecipeSearch;

const Wrapper = styled.div`
`