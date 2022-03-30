import { useState, useEffect} from "react";


function useLocalStorage (key, defaultVal) {
    const item = localStorage.getItem(key);
    const [savedVar, setSavedVar] = useState(
        item ? JSON.parse(item) : defaultVal
    );
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(savedVar));
    }, [key, savedVar]);

    return [savedVar, setSavedVar];
    
}



export default useLocalStorage