import React, {useEffect, useRef} from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { CLASS, PLACEHOLDER, VARIANTS } from "../../../utils/enums";
import { useState } from "react";
import { useGeneralContext } from "../../../context/generalContext";
import UsersSelect from "../common/UsersSelect";
import StatusSelection from "../common/StatusSelection";
import { useUserContext } from "../../../context/userContext";
import { useCurrentProjectContext } from "../../../context/currentProjectContext";
import { useEditContext } from "../../../context/editContext";

/**
 * A component that returns a form to create a new task for a project.
 */

function CreateTask(){

    const [newTasksList, setNewTasksList] = useState([]);

    let taskTitle = useRef('');
    let description = useRef('');
    let progress = useRef(0);

    const [assignee, setAssignee] = useState('');
    const [status, setStatus] = useState('new');
    const [deadline, setDeadline] = useState('');

    const { requestUrl } = useGeneralContext();
    const { setAddTaskChecked } = useEditContext();
    const { token } = useUserContext();
    const { currentProject, setTasksForCurrentProject } = useCurrentProjectContext();

    const [updateTasks, setUpdateTasks] = useState(false);
    const [createdMessage, setCreatedMessage] = useState(false);

    // adds a task to a list to be saved
    const handleAddTask = ()=> {
        setNewTasksList([...newTasksList,
            {taskTitle: taskTitle.current.value,
                assignee,
                status,
                deadline,
                description: description.current.value,
                progress: progress.current.value,
                projectID:currentProject._id}
        ])
    }
    // saves all the tasks to db
    const handleSaveTasks = ()=> {
        newTasksList.forEach(task=>{
            fetch(`${requestUrl}/tasks`, {
                method: 'POST',
                headers:{'Content-Type': 'application/json', 'Authorization':`Bearer ${token}`},
                body:JSON.stringify(task)
            })
                .then(res => res.json())
                .then(() => setUpdateTasks(true))
                .then(() => setAddTaskChecked(false))
                .catch(e=>console.log(e))
        })
    }
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
                .then(() => setCreatedMessage(true))
                .catch(e => console.log(e))
        }
    }, [updateTasks])

    return(
        <fieldset className={CLASS.editSection}>
            <Form.Group>
                <Col sm={12}>
                    <Form.Group as={Row} controlId="formGridTitle" >
                        <Col sm={6}>
                            <Form.Label as="legend"
                                        className={CLASS.subsectionTitle}>
                                task title
                                <Form.Control required
                                              size="sm"
                                              type="text"
                                              placeholder={PLACEHOLDER.enterTitle}
                                              ref={taskTitle}/>
                            </Form.Label>
                            <Form.Label as="legend"
                                        className={CLASS.subsectionTitle}>
                                deadline
                                <Form.Control type="date"
                                              size="sm"
                                              onChange={e => setDeadline(e.target.value)}>
                                </Form.Control>
                            </Form.Label>
                            <Form.Label as="legend"
                                        className={CLASS.subsectionTitle}>
                                description
                                <Form.Control size="sm"
                                              type="textarea"
                                              placeholder={PLACEHOLDER.description}
                                              ref={description}>
                                </Form.Control>
                            </Form.Label>
                            </Col>
                        <Col sm={5}>
                            <Form.Label as="legend"
                                        className={CLASS.subsectionTitle}>
                                assignee
                                <Form.Control size="sm"
                                              as="select"
                                              value={assignee}
                                              onChange={e=>setAssignee(e.target.value)}>
                                    <UsersSelect/>
                                </Form.Control>
                            </Form.Label>
                            <Form.Label as="legend"
                                        className={CLASS.subsectionTitle}>
                                status
                                <Form.Control as="select"
                                              size="sm"
                                              defaultValue="new"
                                              onChange={e => setStatus(e.target.value)}>
                                    <StatusSelection/>
                                </Form.Control>
                            </Form.Label>
                            <Form.Label as="legend"
                                        className={CLASS.subsectionTitle}>
                                progress %
                                <Form.Control type="number"
                                              placeholder="0"
                                              sm={2}
                                              size="sm"
                                              ref={progress}/>
                            </Form.Label>
                        </Col>
                    </Form.Group>
                    <Col sm={11}>
                        <Form.Label as="legend"  className={CLASS.subsectionTitle}>
                            {(description !== '' && taskTitle !== '' && assignee !== '' && deadline !=='') ?
                                <Button variant={VARIANTS.info}
                                        onClick={() => handleAddTask()}>
                                    add a task
                                </Button>:
                                <Button variant={VARIANTS.light}
                                        disabled>
                                    please fill in all fields to add a task
                                </Button>
                            }
                        </Form.Label>
                    </Col>
                    <Col sm={11}>
                        <Form.Label as="legend"
                                    className={CLASS.subsectionTitle}>
                            list of tasks
                            <Form.Control as="select"
                                          size="sm"
                                          multiple>
                                {newTasksList.map(task => <option>{task.taskTitle}, {task.status}</option>)}
                            </Form.Control>
                        </Form.Label>
                        {newTasksList.length !==0 ?
                            <Button variant={VARIANTS.info}
                                    onClick={() => handleSaveTasks()}>save all tasks</Button> :
                            null
                        }
                        {createdMessage?
                            <p>
                                tasks saved!
                            </p>
                            :null}
                    </Col>
                </Col>
            </Form.Group>
        </fieldset>
    )
}

export default CreateTask;