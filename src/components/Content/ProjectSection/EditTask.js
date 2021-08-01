import {CLASS, ROLE, VARIANTS} from "../../../utils/enums";
import { Button, Form } from "react-bootstrap";
import { useGeneralContext } from "../../../context/generalContext";
import UsersSelect from "../common/UsersSelect";
import StatusSelection from "../common/StatusSelection";
import { useEffect, useRef, useState } from "react";
import { useUserContext } from "../../../context/userContext";
import { useTasksContext } from "../../../context/tasksContext";
import { useCurrentProjectContext } from "../../../context/currentProjectContext";
import { useAllUsersContext } from "../../../context/allUsersContext";

function EditTask(){
    const { requestUrl, currentProjectRole } = useGeneralContext();
    const { currentTask } = useTasksContext();
    const { token } = useUserContext();
    const { currentProject, setTasksForCurrentProject } = useCurrentProjectContext();
    const { allUsers } = useAllUsersContext();

    let newTaskTitle = useRef(currentTask.taskTitle);
    let newDescription = useRef(currentTask.description);
    let newProgress = useRef(currentTask.progress);

    const [newTaskStatus, setNewTaskStatus] = useState(currentTask.status);
    const [newTaskAssignee, setNewTaskAssignee] = useState(currentTask.assignee);
    const [newDeadline, setNewDeadline] = useState(currentTask.deadline);

    const [shouldFetch, setShouldFetch] = useState(false);
    const [updateTasks, setUpdateTasks] = useState(false);
    const [updatedMessage, setUpdatedMessage] = useState(false);

    const currentAssignee = allUsers.find(one=> one._id === currentTask.assignee)

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
                .then(() => setUpdatedMessage(true))
                .catch(e => console.log(e))
        }
    }, [updateTasks])

    // modifies the task
    useEffect(()=>{
        if(shouldFetch){
            const newTaskData = {
                taskTitle: newTaskTitle.current.value,
                assignee: newTaskAssignee,
                status: newTaskStatus,
                progress: newProgress.current.value,
                deadline: newDeadline,
                description: newDescription.current.value
            }
            fetch(`${requestUrl}/tasks/${currentTask._id}`,{
                method: 'PATCH',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
                body:JSON.stringify(newTaskData)
            })
                .then(res=>res.json())
                .then(data=>console.log(data))
                .then(()=>setUpdateTasks(true))
                .catch(e=>console.log(e))
        }
    }, [shouldFetch])

    return(
            <div className={CLASS.editSection}>
                <p className={CLASS.subtitleContent}>title:
                {(currentProjectRole.includes(ROLE.admin)||currentProjectRole.includes(ROLE.projectManager))?
                        <Form.Control size='sm'
                                   as='input'
                                   placeholder={currentTask.taskTitle}
                                   ref={newTaskTitle}/>
                       :
                    <p className={CLASS.subtitleContent}>
                        {currentTask.taskTitle}
                    </p>
                }
                </p>

                <p className={CLASS.subtitleContent}>status:
                    <Form.Control as="select"
                                  size="sm"
                                  defaultValue="new"
                                  onChange={e=>setNewTaskStatus(e.target.value)}>
                        <StatusSelection/>
                    </Form.Control>
                </p>

                <p className={CLASS.subtitleContent}>assignee:
                    {(currentProjectRole.includes(ROLE.admin)||currentProjectRole.includes(ROLE.projectManager))?
                        <Form.Control size="sm"
                                   as="select"
                                   onChange={e => setNewTaskAssignee(e.target.value)}>
                        <UsersSelect/>
                    </Form.Control> :
                        <p className={CLASS.subtitleContent}>
                            {currentAssignee.name} {currentAssignee.surname}
                        </p>}
                </p>

                <p className={CLASS.subtitleContent}>deadline:
                    {
                        (currentProjectRole.includes(ROLE.admin)||currentProjectRole.includes(ROLE.projectManager))?
                            <Form.Control type="date"
                                          size="sm"
                                          onChange={e=>setNewDeadline(e.target.value)}/>:
                            <p className={CLASS.subtitleContent}>
                                {newDeadline.split('T')[0]}
                            </p>
                    }

                </p>

                <p className={CLASS.subtitleContent}>description:
                    <Form.Control size='sm'
                                  as='input'
                                  placeholder={currentTask.description}
                                  ref={newDescription}/>
                </p>

                <p className={CLASS.subtitleContent}>progress:
                    <Form.Control type="number"
                                  placeholder={currentTask.progress}
                                  ref={newProgress}
                                  sm={2} size="sm"/>
                </p>
                <p className={CLASS.subtitleContent}>
                    {updatedMessage?
                        <p className={CLASS.subtitleContent}>
                            task updated!
                        </p>:
                        <Button variant={VARIANTS.outlineInfo}
                             onClick={() => {
                                 setShouldFetch(true)
                             }}>
                        save changes
                    </Button>}
                </p>
            </div>
    )
}

export default EditTask;