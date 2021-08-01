import { Button } from "react-bootstrap";
import { useGeneralContext } from "../../../context/generalContext";
import { useEffect, useState } from "react";
import { useUserContext } from "../../../context/userContext";
import { useTasksContext } from "../../../context/tasksContext";
import {useCurrentProjectContext} from "../../../context/currentProjectContext";
import { CLASS, VARIANTS } from "../../../utils/enums";

function DeleteTask(){
    const { requestUrl } = useGeneralContext();
    const { currentTask } = useTasksContext();
    const { token } = useUserContext();
    const { currentProject, setTasksForCurrentProject } = useCurrentProjectContext();

    const [shouldFetch, setShouldFetch] = useState(false);
    const [updateTasks, setUpdateTasks] = useState(false);
    const [deletedMessage, setDeletedMessage] = useState(false);

    // updates tasks for a project
    useEffect(() => {
        if(updateTasks){
            fetch(`${requestUrl}/tasks/${currentProject._id}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
            })
                .then(res => res.json())
                .then(data => setTasksForCurrentProject(data))
                .then(() => setUpdateTasks(false))
                .then(() => setDeletedMessage(true))
                .catch(e => console.log(e))
        }
    }, [updateTasks])

    // removes the task
    useEffect(()=>{
        if(shouldFetch){
            fetch(`${requestUrl}/tasks/${currentTask._id}`,{
                method: 'DELETE',
                headers:{'Content-Type': 'application/json', 'Authorization':`Bearer ${token}`}
            })
                .then(res=>res.json())
                .then(() => setUpdateTasks(true))
                .catch(e=>console.log(e))
        }
    }, [shouldFetch])
    return(
        <>
            {deletedMessage ? <p className={CLASS.welcomeMessage}>task deleted!</p>:
                <>
                    <p>
                        Are you sure you want to delete "{currentTask.taskTitle}"?
                    </p>
                    <Button variant={VARIANTS.outlineInfo}
                    onClick={()=>setShouldFetch(true)}>yes</Button>
                </>
            }
        </>
    )
}

export default DeleteTask;