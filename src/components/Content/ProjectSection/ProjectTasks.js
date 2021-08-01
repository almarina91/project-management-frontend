import { Accordion, Card, ProgressBar } from "react-bootstrap";
import { CLASS, ROLE, VARIANTS } from "../../../utils/enums";
import { useTasksContext } from "../../../context/tasksContext";
import { useEditContext } from "../../../context/editContext";
import { useCurrentProjectContext } from "../../../context/currentProjectContext";
import {useGeneralContext} from "../../../context/generalContext";

function ProjectTasks(){
    const { setCurrentTask } = useTasksContext();

    const { addTaskChecked,
        setAddTaskChecked,
        setShowTaskDetails,
        setEditProjectChecked,
        setDeleteProjectChecked } = useEditContext();

    const { tasksForCurrentProject } = useCurrentProjectContext();
    const { currentProjectRole } = useGeneralContext();

    let projectProgress = 0;

    if(tasksForCurrentProject.length > 0){
        let numberOfTasks = 0;
        let currentTotal = 0;
        tasksForCurrentProject.forEach(task => {
            numberOfTasks += 1;
            currentTotal += task.progress
        })
        projectProgress = Math.floor(currentTotal/numberOfTasks)
    }

    return (
        <>
            <p className={CLASS.subtitleContent}>progress: {projectProgress} %
                <ProgressBar now={projectProgress} variant={VARIANTS.info}/>
            </p>
            <Accordion>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0" className={CLASS.accordionTitle}>
                        tasks... &#x25BF;
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body className={CLASS.cardBody}>
                            {(currentProjectRole.includes(ROLE.admin) || currentProjectRole.includes(ROLE.projectManager)) ?
                                <p className={CLASS.subTitleContentTasks}
                                    onClick={() => {
                                    setShowTaskDetails(false)
                                    setEditProjectChecked(false)
                                    setDeleteProjectChecked(false)
                                    setAddTaskChecked(!addTaskChecked)}}>
                                    <strong>+ add a new task</strong>
                                </p> :
                                null}
                            {tasksForCurrentProject ?
                                tasksForCurrentProject.map(task =>
                                    <p className={CLASS.subTitleContentTasks} onClick={() => {
                                        setCurrentTask(task)
                                        setAddTaskChecked(false)
                                        setEditProjectChecked(false)
                                        setShowTaskDetails(true)
                                        setDeleteProjectChecked(false)
                                    }}>
                                        {task.taskTitle}, {task.status}
                                    </p>) :
                                null}
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
         </Accordion>
        </>
    )
}

export default ProjectTasks;