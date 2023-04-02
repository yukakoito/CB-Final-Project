import { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import usePersistedState from "../components/usePersistedState";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth0();
  const [userId, setUserId] = usePersistedState(null, "user-id");
  const [recipeToAdd, setRecipeToAdd] = usePersistedState(null, "recipeToAdd");
  const [pantry, setPantry] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [mealPlans, setMealPlans] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isErr, setIsErr] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [updatedRecipe, setUpdatedRecipe] = useState(null);

  // Filter recipes to save in the favoriteRecipes and mealPlans states
  const filterRecipes = (data) => {
    const favorites = [];
    const meals = [];
    data.filter((ele) => {
      ele.isLiked && favorites.push(ele);
      ele.isPlanned && meals.push(ele);
    });
    setFavoriteRecipes(favorites);
    setMealPlans(meals);
  };

  // Retrieve user data or create a new user upon sign in/sign up with Auth0
  const setupUser = async () => {
    // const recipe =
    const userData = {
      firstName: user.given_name,
      lastName: user.family_name,
      email: user.email,
      recipe: recipeToAdd && Object.values(recipeToAdd)[0],
    };

    setIsDataLoading(true);

    try {
      const res = await fetch("/api/setup-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (data.status === 200) {
        setUserId(data.data._id);
        setPantry(data.data.pantry);
        setShoppingList(data.data.shoppingList);
        filterRecipes(data.data.savedRecipes);
        recipeToAdd && setUpdatedRecipe(Object.values(recipeToAdd)[0]);
        setRecipeToAdd(null);
      } else {
        setErrMsg(data.message);
      }
    } catch (e) {
      setIsErr(true);
    } finally {
      setIsDataLoading(false);
    }
  };

  // Update pantry, shoppingList and savedRecipes
  const updateUser = async (obj) => {
    try {
      const res = await fetch("/api/update-user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...obj, _id: userId }),
      });
      const data = await res.json();
      if (data.status === 200) {
        data.pantry && setPantry(data.pantry);
        data.shoppingList && setShoppingList(data.shoppingList);
        data.savedRecipes && filterRecipes(data.savedRecipes);
        if (data.savedRecipes) {
          filterRecipes(data.savedRecipes);
          setUpdatedRecipe(Object.values(obj)[0]);
        }
        if (data.data) {
          setPantry(data.data.pantry);
          setShoppingList(data.data.shoppingList);
        }
      } else {
        setErrMsg(data.message);
      }
    } catch (e) {
      setIsErr(true);
    }
  };

  useEffect(() => {
    user && setupUser();
    setIsErr(false);
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        pantry,
        setPantry,
        shoppingList,
        setShoppingList,
        isErr,
        errMsg,
        updateUser,
        isAuthenticated,
        favoriteRecipes,
        setFavoriteRecipes,
        mealPlans,
        setMealPlans,
        setRecipeToAdd,
        isDataLoading,
        updatedRecipe,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
