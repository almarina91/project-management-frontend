import {CLASS, VARIANTS} from "../../../utils/enums";
import { Button, ProgressBar } from "react-bootstrap";
import { useState } from "react";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";
import { useTasksContext } from "../../../context/tasksContext";
import { useEditContext } from "../../../context/editContext";
import { useAllUsersContext } from "../../../context/allUsersContext";

function TaskSection() {
    const { setShowTaskDetails } = useEditContext();
    const { currentTask } = useTasksContext();

    const [editTaskVisible, setEditTaskVisible] = useState(false);
    const [deleteTaskVisible, setDeleteTaskVisible] = useState(false);
    const { allUsers } = useAllUsersContext();

    const currentAssignee = allUsers.find(one=> one._id === currentTask.assignee)

    return (
        <>
            <Button variant={VARIANTS.outlineDanger}
                    className={CLASS.cancelButton}
                    onClick={() => setShowTaskDetails(false)}>x</Button>
            { editTaskVisible ?
                <>
                    <EditTask/>
                    <p className={CLASS.subtitleContent}>
                        <Button variant={VARIANTS.outlineDanger} onClick={() => setEditTaskVisible(false)}>cancel</Button>
                    </p>
                </>
                :
                <>
                    <div className={CLASS.editSection}>
                        <p className={CLASS.projectTitle}>{currentTask.taskTitle}</p>
                        <p className={CLASS.subtitleContent}>status: <strong>{currentTask.status}</strong></p>
                        <p className={CLASS.subtitleContent}>assignee: <strong>{currentAssignee.name} {currentAssignee.surname}</strong></p>
                        <p className={CLASS.subtitleContent}>deadline: <strong>{currentTask.deadline.split('T')[0]}</strong>
                        </p>
                        <p className={CLASS.subtitleContent}>description: <strong>{currentTask.description}</strong></p>
                        <p className={CLASS.subtitleContent}>progress:
                            <ProgressBar now={currentTask.progress}
                                         label={`${currentTask.progress}%`}
                                         variant={VARIANTS.success} sm={2}/>
                        </p>
                        <p className={CLASS.subtitleContent}>
                            <Button variant={VARIANTS.outlineInfo}
                                    onClick={() => setEditTaskVisible(true)}>
                                edit
                            </Button>
                            <Button variant={VARIANTS.outlineDanger}
                                    onClick={() => setDeleteTaskVisible(!deleteTaskVisible)}>
                                delete task
                            </Button>
                        </p>
                        { deleteTaskVisible ?
                            <p className={CLASS.subtitleContent}>
                                <DeleteTask/>
                                <Button  variant={VARIANTS.outlineDanger}
                                         onClick={()=>setDeleteTaskVisible(false)}>
                                    close
                                </Button>
                            </p>
                        :null}
                    </div>
                </>}
        </>

    )
}

export default TaskSection;