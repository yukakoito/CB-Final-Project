import { useContext, useState } from "react";
import styled from "styled-components";
import { DataContext } from "../../contexts/DataContext";
import SearchOptions from "./SearchOptions";

const RecipeSearch = () => {
  const { searchRecipes, searchOptions, setSearchOptions } =
    useContext(DataContext);
  const [input, setInput] = useState("");

  // Clear search fields
  const clearSearchCriteria = () => {
    setSearchOptions({});
    setInput("");
  };

  return (
    <Wrapper>
      <div>
        <input
          placeholder="Ingredients"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <input
          placeholder="Max. # of ingredients"
          type="number"
          min="1"
          value={searchOptions.ingr ? searchOptions.ingr : ""}
          onChange={(e) =>
            setSearchOptions({ ...searchOptions, ingr: e.target.value })
          }
        />
      </div>
      <SearchOptions />
      <div className="buttons">
        <button
          onClick={() => {
            searchRecipes(input);
            clearSearchCriteria();
          }}
          disabled={
            !input && !Object.keys(searchOptions).includes("health")
              ? true
              : false
          }
        >
          Search
        </button>
        <button onClick={() => clearSearchCriteria()}>Clear</button>
      </div>
    </Wrapper>
  );
};

export default RecipeSearch;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: space-between;
  margin: 10px 0 20px;

  div {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
  }

  button {
    padding: 5px;
    background-color: var(--primary-color);
    outline: 1px solid var(--primary-color);
    color: white;
    border: none;
    flex: auto;
    max-width: 48%;
    margin-top: 10px;

    &:hover {
      background-color: white;
      outline: 3px solid var(--primary-color);
      color: var(--primary-color);
      font-weight: bold;
    }
  }
`;
