import styled from "styled-components";
import { DataContext } from "../DataContext";
import { useContext, useState } from "react";

const Input = ({onClickFunc}) => {
  const { ingredients } = useContext(DataContext);
  const [ input, setInput ] = useState('');
  const [ hideList, setHideList ] = useState(false);
  const [ selectedItemIndex, setSelectedItemIndex ] = useState(-1);

  // Create a list of matched ingredients based on user input
  const suggestions = ingredients && input ? 
                      ingredients.filter(ingredient => 
                        ingredient.name.toLowerCase().includes(input.toLowerCase()))
                      : null;

  const handleSelect = (ingredient) => {
    setInput(ingredient)
    setHideList(true)
    console.log('selected', ingredient)
  }

  return (
    <Wrapper>
       <InputArea>
        <input type='text'
              placeholder="🔍 ingredient"
              value={input}
              onChange={e => {setInput(e.target.value)
                              setHideList(false)
                              }}
              onKeyDown={ e => {
                switch(e.key) {
                  case 'Enter':
                    if(selectedItemIndex > -1) {
                      handleSelect(suggestions[selectedItemIndex])
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
        <button onClick={() => {onClickFunc(input);
                                setInput('');
                                }
                        }
                disabled={input? false : true}
        >
          Search
        </button>
      </InputArea>
      <Suggestions> 
      { suggestions && input.length >= 2 && suggestions.length > 0 && !hideList && (suggestions.map((suggestion, i) =>
        <p key={`RecipeSearch-${suggestion._id}`} 
                    onClick={() => handleSelect(suggestion.name)}
                    selectedItemIndex={selectedItemIndex} 
                    setSelectedItemIndex={setSelectedItemIndex}
                    index={i}
                    >
          {suggestion.name}
        </p>
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
const Suggestions = styled.li`
`