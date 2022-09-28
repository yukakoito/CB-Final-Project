import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({children}) => {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [pantry, setPantry] = useState(null);
  const [shoppingList, setShoppingList] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState(null);
  const [isError, setIsError] = useState(false);

  console.log({userId})

  // This function is to get current user data
  const getUserData = async () => {
    try {
      const res = await fetch(`/api/get-user/${userId}`);
      const data = await res.json();
      const userData = data.data;
      setPantry(userData.pantry);
      setShoppingList(userData.shoppingList);
      setSavedRecipes(userData.savedRecipes);
      console.log("USER DATA", userData)
      const userInfo = Object.fromEntries(Object.entries(userData)
                        .filter(([key, value]) => key !== 'pantry' && key !== 'shoppingList' && key !== 'savedRecipes'));
      setUser(userInfo);
      } catch (err) {
        setIsError(true);
      }
  }

  useEffect(() => {
    userId && getUserData();
    setIsError(false);
  }, [ ,userId])

  return (
    <UserContext.Provider value={{userId, 
                                  user,
                                  pantry, 
                                  setPantry,
                                  shoppingList, 
                                  setShoppingList,
                                  savedRecipes, 
                                  setSavedRecipes,
                                  isError, 
                                  setIsError,
                                }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext;