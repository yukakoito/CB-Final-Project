import styled from "styled-components";
import Dropdown from "./Dropdown";
import { searchOptionData } from "../../data/searchOptionData";

const SearchOptions = () => {
  return (
    <Wrapper>
      {Object.entries(searchOptionData).map(([key, value]) => (
        <Dropdown key={key} name={key} array={value} />
      ))}
    </Wrapper>
  );
};

export default SearchOptions;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  gap: 10px;
`;
