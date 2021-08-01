import React, { createContext, useContext, useState } from 'react';

export const refreshProjectListContext = createContext();

export const useRefreshProjectListContext = () => useContext(refreshProjectListContext);

export function RefreshProjectListContextProvider({ children }) {

    const [refreshProjectList, setRefreshProjectList] = useState(false);

    return(
        <refreshProjectListContext.Provider value={{
            refreshProjectList,
            setRefreshProjectList
        }}>
            {children}
        </refreshProjectListContext.Provider>
    )
}