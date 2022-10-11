import styled from "styled-components";
import Dropdown from "./Dropdown";
import { useContext } from "react";
import { DataContext } from "../DataContext";

const SearchOptions = () => {
  const { parameters } = useContext(DataContext);

  return (
    <Wrapper>
      { parameters && Object.entries(parameters).map(([key, value]) => 
       <Dropdown key={key} name={key} array={value} />
       )}
    </Wrapper>
  )
}

export default SearchOptions;

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`