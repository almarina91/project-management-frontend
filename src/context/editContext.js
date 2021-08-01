import React, {createContext, useContext, useState} from 'react';

export const editContext = createContext();

export const useEditContext = () => useContext(editContext);

export function EditContextProvider({children}) {

    const [showTaskDetails, setShowTaskDetails] = useState(false);
    const [addTaskChecked, setAddTaskChecked] = useState(false);
    const [editProjectChecked, setEditProjectChecked] = useState(false);
    const [deleteProjectChecked, setDeleteProjectChecked] = useState(false);

    return(
        <editContext.Provider value={{
            addTaskChecked,
            setAddTaskChecked,

            showTaskDetails,
            setShowTaskDetails,

            editProjectChecked,
            setEditProjectChecked,

            setDeleteProjectChecked,
            deleteProjectChecked
        }}>
            {children}
        </editContext.Provider>
    )
}