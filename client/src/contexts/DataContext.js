import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const DataContext = createContext(null);

// This Data context provides list of ingredients and all the parameters used for recipe search.
const DataProvider = ({ children }) => {
  const [parameters, setParameters] = useState(null);
  const [dataErr, setDataErr] = useState(false);
  const [dataErrMsg, setDataErrMsg] = useState("");
  const [recipes, setRecipes] = useState(null);
  const [searchOptions, setSearchOptions] = useState({});
  const [isRecipeLoading, setIsRecipeLoading] = useState(false);
  const { setIsDataLoading, userId } = useContext(UserContext);

  // Get ingredients and parameters used for recipe search
  const getData = () => {
    setIsDataLoading(true);
    fetch("/api/get-data")
      .then((res) => res.json())
      .then((data) => {
        setParameters(data.data);
      })
      .catch((err) => setDataErr(true))
      .finally(() => setIsDataLoading(false));
  };

  useEffect(() => {
    !parameters && getData();
  }, [parameters]);

  // Search recipes
  const searchRecipes = async (data) => {
    // Reformat and combine the search options
    let options = "";
    Object.keys(searchOptions).map((key) => {
      if (searchOptions[key] === "") return null;
      options += `&${key}=${searchOptions[key]}`;
    });

    const ingredient = data ? data.replaceAll(" ", "%20") : null;

    // Create a query string with ingredients and search options
    const query = ingredient + options + [userId ? `&user=${userId}` : ""];

    if (!query) return;

    try {
      setDataErrMsg(null);
      setIsRecipeLoading(true);
      setRecipes(null);
      const res = await fetch(`/api/get-recipes/${query}`);
      const data = await res.json();
      setIsRecipeLoading(false);
      if (data.status === 200) {
        setRecipes(data.recipes);
      } else {
        setDataErrMsg(data.message);
        setTimeout(() => {
          setDataErrMsg(null);
        }, 10000);
      }
    } catch (err) {
      setIsRecipeLoading(false);
      setDataErr(true);
    }
  };

  return (
    <DataContext.Provider
      value={{
        parameters,
        recipes,
        setRecipes,
        searchRecipes,
        searchOptions,
        setSearchOptions,
        isRecipeLoading,
        setIsRecipeLoading,
        dataErr,
        dataErrMsg,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
