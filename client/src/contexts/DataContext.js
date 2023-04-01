import { createContext, useState, useContext } from "react";
import usePersistedState from "../components/usePersistedState";
import { UserContext } from "../contexts/UserContext";

export const DataContext = createContext(null);

// This Data context provides recipe search results
const DataProvider = ({ children }) => {
  const [dataErr, setDataErr] = useState(false);
  const [dataErrMsg, setDataErrMsg] = useState("");
  const [recipes, setRecipes] = usePersistedState(null, "recipes");
  const [searchOptions, setSearchOptions] = useState({});
  const [isRecipeLoading, setIsRecipeLoading] = useState(false);
  const { userId } = useContext(UserContext);

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
