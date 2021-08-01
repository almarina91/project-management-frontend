import React, { createContext, useContext, useState } from 'react';

export const generalContext = createContext();

export const useGeneralContext = () => useContext(generalContext);

export function ContextProvider({children}) {

    const requestUrl = process.env.NODE_ENV === 'development' ?
        'http://localhost:3001' :
        'https://almarina91-pm-backend.herokuapp.com';

    const [projectsVisible, setProjectsVisible] = useState(false);
    const [currentProjectRole, setCurrentProjectRole] = useState('developer');

    return (
        <generalContext.Provider value={
            { requestUrl,
            projectsVisible,
            setProjectsVisible,
            currentProjectRole,
            setCurrentProjectRole
            }
        }>
            {children}
        </generalContext.Provider>
    )
}