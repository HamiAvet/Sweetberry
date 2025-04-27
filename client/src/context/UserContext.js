import { createContext, useState, useMemo } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState()
    const userId = useMemo(() => {
        return JSON.parse(localStorage.getItem('userData'));
    }, [])

    const getData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/myaccount/${userId["userId"]}`);
            
            setUser(response.data.user);

        } catch (error) {
            console.error("Error loading data", error);
        }
    };

  return (
    <UserContext.Provider value={{ user, getData }}>
      {children}
    </UserContext.Provider>
  );
};
