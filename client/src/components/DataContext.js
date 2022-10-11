import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const DataContext = createContext(null);

// This Data context provides list of ingredients and all the parameters used for recipe search.
const DataProvider = ({children}) => {
  const [ingredients, setIngredients] = useState(null);
  const [parameters, setParameters] = useState(null);
  const [dataErr, setDataErr] = useState(false);
  const [dataErrMsg, setDataErrMsg] = useState('');
  const [recipes, setRecipes] = useState(null);
  const [searchOptions, setSearchOptions] = useState({});
  const [pageDisplay, setPageDisplay] = useState({search: false, 
                                                  pantry: true, 
                                                  shoppingList: false, 
                                                  meals: false, 
                                                  favorites: true,
                                                  results: false,
                                                  });
  const [isRecipeLoading, setIsRecipeLoading] = useState(false);
  const {setIsDataLoading} = useContext(UserContext);

  // Get ingredients and parameters used for recipe search
  const getData = () => {
    setIsDataLoading(true);
    fetch('/api/get-data')
    .then(res => res.json())
    .then(data => {
      setIngredients(data.data.ingredients)
      setParameters(data.data.parameters)
    })
    .catch((err) => setDataErr(true)) 
    .finally(() => setIsDataLoading(false))
  }

  useEffect(() => {
    !parameters && getData();
  }, [parameters])

  // Search recipes
  const searchRecipes = async (data) => {
    // Reformat and combine the search options
    let options = '';
    Object.keys(searchOptions).map(key => {
      if(searchOptions[key] === '') return null;
      options += `&${key}=${searchOptions[key]}`
    })
    
    const ingredient = data? data.replaceAll(' ', '%20') :null;

    // Create a query string with ingredients and search options
    const query = ingredient + options

    if(!query) return;

    try {
      setDataErrMsg(null);
      setIsRecipeLoading(true);
      setPageDisplay({...pageDisplay, meals: false, favorites: false, results: true});
      setRecipes(null);
      const res = await fetch(`/api/get-recipes/${query}`)
      const data = await res.json();
      setIsRecipeLoading(false);
      if(data.status === 200) { 
        setRecipes(data.recipes);
        setIngredients(data.ingredients);
      } else {
        setDataErrMsg(data.message);
      }
    } catch (err) {
      setIsRecipeLoading(false);
      setDataErr(true);
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
                                  pageDisplay, 
                                  setPageDisplay,
                                  isRecipeLoading, 
                                  setIsRecipeLoading,
                                  dataErr,
                                  dataErrMsg,
                                  }}>
      {children}
    </DataContext.Provider>
  )
}

export default DataProvider;