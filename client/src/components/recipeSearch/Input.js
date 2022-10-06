import styled from "styled-components";
import { DataContext } from "../DataContext";
import { useContext, useState } from "react";

const Input = ({placeholder, index}) => {
  const { ingredients, searchFields, setSearchFields } = useContext(DataContext);
  const [ hideList, setHideList ] = useState(false);
  const [ selectedItemIndex, setSelectedItemIndex ] = useState(-1);

  const input = Object.values(searchFields)[index];

  // Create a list of matched ingredients based on user input
  const suggestions = ingredients && input ? 
                      ingredients.filter(ingredient => 
                        ingredient.name.toLowerCase().includes(input.toLowerCase()))
                      : null;

  const handleSearchInput = (key, value) => {
    setSearchFields({...searchFields, [key]: value})
    setHideList(true)
  }

  return (
    <Wrapper>
       <InputArea>
        <input type='text'
              placeholder={placeholder}
              value={input}
              onChange={e => {setSearchFields({...searchFields, [index]: e.target.value})
                              hideList(false)}}
              onKeyDown={ e => {
                switch(e.key) {
                  case 'Enter':
                    if(selectedItemIndex > -1) {
                      handleSearchInput(index, suggestions[selectedItemIndex])
                    }
                    return;
                  case "ArrowUp":
                    if(selectedItemIndex > 0 && input.length >= 2 && suggestions.length !== 0 ) {
                      setSelectedItemIndex(selectedItemIndex -1);
                    }
                    return;
                  case "ArrowDown":
                    if(selectedItemIndex < suggestions.length -1 && input.length >= 2 && suggestions.length !== 0) {
                      setSelectedItemIndex(selectedItemIndex +1)
                    }
                    return;
                  case "Escape":
                    setHideList(true);
                    return;
                }
              }}
                />
      </InputArea>
      <Suggestions> 
      { suggestions && input.length >= 2 && suggestions.length > 0 && !hideList && (suggestions.map((suggestion, i) =>
        <li key={`recipeSearch-${suggestion._id}`} 
                    onClick={() => handleSearchInput(index, suggestion.name)}
                    selectedItemIndex={selectedItemIndex} 
                    setSelectedItemIndex={setSelectedItemIndex}
                    index={i}
                    >
          {suggestion.name.toLowerCase()}
        </li>
      ))}
      </Suggestions>
    </Wrapper>
  )
}

export default Input;

const Wrapper = styled.div`
`
const InputArea = styled.div`
`
const Suggestions = styled.ul`
`