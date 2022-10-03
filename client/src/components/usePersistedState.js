import { useState, useEffect } from "react";

const usePersistedState = (initialValue, storageKey) => {

    const getStoredValue = () => {
        const storedValue = window.localStorage.getItem(storageKey);
        return storedValue? JSON.parse(storedValue) : initialValue;
    }

    const [value, setValue]  = useState(getStoredValue());

    useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(value));
    }, [value, storageKey])

    return [value, setValue];
}

export default usePersistedState;