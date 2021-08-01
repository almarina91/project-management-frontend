import React, { createContext, useContext, useState } from 'react';

export const currentProjectContext = createContext();

export const useCurrentProjectContext = () => useContext(currentProjectContext);

export function CurrentProjectContextProvider({ children }) {

    const [currentProject, setCurrentProject] = useState({});
    const [tasksForCurrentProject, setTasksForCurrentProject] = useState([]);

    return(
        <currentProjectContext.Provider value={{
            currentProject,
            setCurrentProject,
            tasksForCurrentProject,
            setTasksForCurrentProject
        }}>
            {children}
        </currentProjectContext.Provider>
    )
}