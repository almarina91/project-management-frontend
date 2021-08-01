import React, { createContext, useContext, useState } from 'react';

export const displayContext = createContext();

export const useDisplayContext = () => useContext(displayContext);

export function DisplayContextProvider({ children }) {

    const [displayProject, setDisplayProject] = useState(false);
    const [displayWelcome, setDisplayWelcome] = useState(true);
    const [displayNewProject, setDisplayNewProject] = useState(false);
    const [displayDeletedMessage, setDisplayDeletedMessage] = useState(false);
    const [displayEditUser, setDisplayEditUser] = useState(false);
    const [displayLogOut, setDisplayLogOut] = useState(false);

    return(
        <displayContext.Provider value={{
            displayWelcome,
            setDisplayWelcome,
            displayProject,
            setDisplayProject,
            displayNewProject,
            setDisplayNewProject,
            displayDeletedMessage,
            setDisplayDeletedMessage,
            displayEditUser,
            setDisplayEditUser,
            setDisplayLogOut,
            displayLogOut
        }}>
            {children}
        </displayContext.Provider>
    )
}