import { createContext, useContext, useEffect, useState } from "react";

export const DataContext = createContext(null);

// This Data context provides list of ingredients and all the parameters used for recipe search.
const DataProvider = ({children}) => {
  const [ingredients, setIngredients] = useState(null);
  const [parameters, setParameters] = useState(null);
  const [dataError, setDataError] = useState(false);
  const [ edamamParameters, setEdamamParameters] = useState(null);

  // Get ingredients and parameters used for recipe search
  const getData = () => {
    fetch('/api/get-ingredients')
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setIngredients(data.data.ingredients)
      setParameters(data.data.parameters)
      setEdamamParameters(data.data.edamamParameters)
    })
    .catch((err) => setDataError(true)) 
  }

  useEffect(() => {
    !parameters && getData();
  }, [])

  return (
    <DataContext.Provider value={{ingredients, 
                                  setIngredients, 
                                  parameters,
                                  edamamParameters,
                                  }}>
      {children}
    </DataContext.Provider>
  )
}

export default DataProvider;