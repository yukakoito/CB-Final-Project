import { createContext, useEffect, useState } from "react";

export const DataContext = createContext(null);

// This Data context provides list of ingredients and all the parameters used for recipe search.
const DataProvider = ({children}) => {
  const [ingredients, setIngredients] = useState(null);
  const [parameters, setParameters] = useState(null);
  const [dataError, setDataError] = useState(false);
  const [recipes, setRecipes] = useState(null);
  const [searchOptions, setSearchOptions] = useState({});
  const [selection, setSelection] = useState('');
  const [searchInput, setSearchInput] = useState('');

  // Get ingredients and parameters used for recipe search
  const getData = () => {
    fetch('/api/get-data')
    .then(res => res.json())
    .then(data => {
      console.log('DATA CONTEXT', data)
      setIngredients(data.data.ingredients)
      setParameters(data.data.parameters)
    })
    .catch((err) => setDataError(true)) 
  }

  useEffect(() => {
    !parameters && getData();
  }, [])

  console.log('searchOptions', searchOptions)

  // Search recipes
  const searchRecipes = async (data) => {
    // Reformat and combine the search options
    let options = '';
    Object.keys(searchOptions).map(key => {
      if(searchOptions[key] === '') return null;
      options += `&${key}=${searchOptions[key]}`
    })
    
    const ingredient = data? data.replaceAll(' ', '%20') : searchInput.replaceAll(' ', '%20')

    console.log('OPTIONS' , options)
    console.log('INGREDIENT', ingredient)

    

    // Create a query string with ingredients and search options
    const query = ingredient + options
    console.log('QUERY', query)

    try {
      const res = await fetch(`/api/get-recipes/${query}`)
      const data = await res.json();
      console.log(data)
      if(data.status === 200) { 
        console.log('RECIPES', data.recipes)
        setRecipes(data.recipes);
        setIngredients(data.ingredients)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <DataContext.Provider value={{ingredients, 
                                  setIngredients, 
                                  parameters,
                                  recipes,
                                  setRecipes,
                                  searchRecipes,
                                  searchOptions, 
                                  setSearchOptions,
                                  }}>
      {children}
    </DataContext.Provider>
  )
}

export default DataProvider;