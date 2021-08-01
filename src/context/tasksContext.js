import React, {createContext, useContext, useState} from 'react';

export const tasksContext = createContext();

export const useTasksContext = () => useContext(tasksContext);

export function TasksContextProvider({children}) {

    const [currentTask, setCurrentTask] = useState('');

    return(
        <tasksContext.Provider value={{
            currentTask,
            setCurrentTask
        }}>
            {children}
        </tasksContext.Provider>
    )
}