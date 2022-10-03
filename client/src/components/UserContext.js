import { createContext, useContext, useEffect, useState } from "react";
import DataProvider, { DataContext } from "./DataContext";
import { useAuth0 } from "@auth0/auth0-react";
import usePersistedState from "./usePersistedState";

export const UserContext = createContext(null);

export const UserProvider = ({children}) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userId, setUserId] = usePersistedState(null, 'user-id');
  const [pantry, setPantry] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState(null);

  // console.log({userId})
  // console.log('USER', user)

  // Retrieve user data or create a new user upon sign in with Auth0
  const setupUser = async () => {
    try {
      const res = await fetch('/api/setup-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({firstName: user.given_name, lastName: user.family_name, email: user.email}),
      })
      const data = await res.json();
      console.log('USERCONTEXT', data)
      if(data.status === 200) {
        setUserId(data.data._id)
        setPantry(data.data.pantry);
        setShoppingList(data.data.shoppingList);
        setSavedRecipes(data.data.savedRecipes);
      } 
    } catch (e) {
      setIsError(true)
    } 
  }  

  // Update pantry, shopping list and saved recipes
  const updateUser = async (obj) => {
    console.log('UPDATE USER',{...obj, _id: userId})

    try {
      const res = await fetch('/api/update-user', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({...obj, _id: userId}),
      })
      const data = await res.json();
      console.log(data)
      if(data.status === 200) {
        data.pantry && setPantry(data.pantry);
        data.shoppingList && setShoppingList(data.shoppingList);
        data.savedRecipes && setSavedRecipes(data.savedRecipes);
        if(data.data) {
          setPantry(data.data.pantry)
          setShoppingList(data.data.shoppingList)
        };
      } else {
        setErrMsg(data.message)
      }
    } catch (e) {
      setIsError(true)
    } 
  }

  // useEffect(() => {
  //   !isAuthenticated && setUserId(null);
  // }, [isAuthenticated])

  useEffect(() => {
    user && setupUser();
    setIsError(false);
  }, [user])

  return (
    <UserContext.Provider value={{userId,
                                  pantry, 
                                  setPantry,
                                  shoppingList, 
                                  setShoppingList,
                                  savedRecipes, 
                                  setSavedRecipes,
                                  isError, 
                                  setIsError,
                                  updateUser,
                                }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;