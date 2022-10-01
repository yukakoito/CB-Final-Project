import { createContext, useContext, useEffect, useState } from "react";
import DataProvider, { DataContext } from "./DataContext";
import Pantry from "./profile/Pantry";

export const UserContext = createContext(null);

export const UserProvider = ({children}) => {
  const [userId, setUserId] = useState('b40913b5-2d9a-444b-863d-f968cdbc1aef');
  const [user, setUser] = useState(null);
  const [pantry, setPantry] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState(null);

  // console.log({userId})

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

  // Add or remove an item from Pantry
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
        data.data && setPantry(data.data.pantry) && setShoppingList(data.data.shoppingList);
      } else {
        setErrMsg(data.message)
      }
    } catch (e) {
      setIsError(true)
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
                                  updateUser,
                                }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;