import styled from "styled-components";
import { useState } from "react";
import Input from "./Input";
import SearchOptions from "./SearchOptions";

const RecipeSearch = () => {
  const [recipes, setRecipes] = useState(null);
  const [ searchOptions, setSearchOptions ] = useState({})

  console.log('searchOptions', searchOptions)
  
  // 
  const handleSelect = (key, value) => {
    setSearchOptions({...searchOptions, [key]: value.replaceAll(' ', '%20')})
  }

  // Search recipes by an ingredient
  const searchRecipes = async (ingredient) => {
    // Reformat and combine the search options
    let options = '';
    Object.keys(searchOptions).map(key => {
      if(searchOptions[key] === '') return null;
      options += `&${key}=${searchOptions[key]}`
    })
    console.log('OPTIONS' , options)
    
    // Create a query string with an ingredient and search options
    const query = ingredient.replaceAll(' ', '%20') + options
    console.log('QUERY', query)

    try {
      const res = await fetch(`/api/get-recipes/${query}`)
      const data = res.json();
      if(data.status === 200) { 
        console.log('RECIPES', data.data)
        setRecipes(data.data);
        // update ingredients list etc
      }
    } catch (err) {
      console.log(err)
    } finally {
      setSearchOptions({});
    }
  }

  return (
    <Wrapper>
      <Input onClickFunc={searchRecipes}/>
      <SearchOptions handleSelect={handleSelect}/>
    </Wrapper>
  )
}

export default RecipeSearch;

const Wrapper = styled.div`
`