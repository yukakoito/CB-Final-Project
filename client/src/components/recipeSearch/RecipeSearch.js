import { useContext, useState } from "react";
import styled from "styled-components";
import { DataContext } from "../DataContext";
import Input from "./Input";
import SearchOptions from "./SearchOptions";

const RecipeSearch = () => {
  const { searchRecipes, 
          searchOptions, 
          setSearchOptions, 
        } = useContext(DataContext);
  const [input, setInput] = useState('');

  const clearSearchCriteria = () => {
    setSearchOptions({});
    setInput('');
  }

  return (
    <Wrapper>
      <input placeholder="🔍 Ingredients"
             type='text'
             value={input}
             onChange={(e) => setInput(e.target.value)}
      />
      <input placeholder="Max. number of ingredients"
             type='number'
             min='1'
             value={searchOptions.ingr ? searchOptions.ingr : ''}
             onChange={(e) => setSearchOptions({...searchOptions, ingr: e.target.value})}
      />
      <SearchOptions />
      <button onClick={() => {searchRecipes(input);
                              clearSearchCriteria();
                              }
                      } 
              disabled={!input && Object.keys(searchOptions).length === 0 ? true : false}
      >
        Search
      </button>
      <button onClick={() => clearSearchCriteria()}>
        Reset
      </button>
    </Wrapper>
  )
}

export default RecipeSearch;

const Wrapper = styled.div`
`
