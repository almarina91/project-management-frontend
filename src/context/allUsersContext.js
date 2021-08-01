import React, {createContext, useContext, useEffect, useState} from 'react';
import {useUserContext} from "./userContext";
import {useGeneralContext} from "./generalContext";

export const allUsersContext = createContext();

export const useAllUsersContext = () => useContext(allUsersContext);

export function AllUsersContextProvider({children}) {

    const [allUsers, setAllUsers] = useState([]);
    const {token} = useUserContext()
    const { requestUrl } = useGeneralContext();

    useEffect(() => {
        if(token !== ''){
            fetch(`${requestUrl}/users`,{
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization':`Bearer ${token}` }
            })
                .then(res=>res.json())
                .then(data=>setAllUsers(data))
                .catch(e=>console.log(e))
        }
    }, [token])

    return(
        <allUsersContext.Provider value={{
            allUsers,
            setAllUsers
        }}>
            {children}
        </allUsersContext.Provider>
    )
}