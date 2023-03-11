import { useState, useEffect } from "react";

// This state is used to store userId and a recipe to save when user isn't logged in
const usePersistedState = (initialValue, storageKey) => {
  const getStoredValue = () => {
    const storedValue = window.sessionStorage.getItem(storageKey);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  };

  const [value, setValue] = useState(getStoredValue());

  useEffect(() => {
    window.sessionStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue];
};

export default usePersistedState;
