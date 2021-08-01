import React, { createContext, useContext, useState } from 'react';

export const newProjectContext = createContext();

export const useNewProjectContext = () => useContext(newProjectContext);

export function NewProjectContextProvider({children}) {

    const [adminID, setAdminID] = useState('');
    const [projectManagerID, setProjectManagerID] = useState('');
    const [developersIDs, setDevelopersIDs] = useState([]);
    const [showTasks, setShowTasks] = useState(false);

    return (
        <newProjectContext.Provider value={
            {
                adminID,
                setAdminID,
                setProjectManagerID,
                projectManagerID,
                setDevelopersIDs,
                developersIDs,
                setShowTasks,
                showTasks
            }
        }>
            {children}
        </newProjectContext.Provider>
    )
}