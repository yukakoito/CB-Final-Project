import styled from "styled-components";
import Dropdown from "./Dropdown";
import { useContext, useState } from "react";
import { DataContext } from "../DataContext";

const SearchOptions = ({handleSelect}) => {

  const { edamamParameters } = useContext(DataContext);

  return (
    <Wrapper>
      <p>Search options</p>
      { edamamParameters && Object.entries(edamamParameters).map(([key, value]) => 
       <Dropdown key={key} name={key} array={value} handleSelect={handleSelect}/>
       )}
    </Wrapper>
  )
}

export default SearchOptions;

const Wrapper = styled.div`
`