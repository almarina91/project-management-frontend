import React, {createContext, useContext, useState} from 'react';

export const userContext = createContext();

export const useUserContext = () => useContext(userContext);

export function UserContextProvider({children}) {

    const [userData, setUserData] = useState({});
    const [token, setToken] = useState('');
    const [userProjects, setUserProjects] = useState([]);

    return(
        <userContext.Provider value={{
            userData,
            setUserData,
            token,
            setToken,
            userProjects,
            setUserProjects
        }}>
            {children}
        </userContext.Provider>
    )
}