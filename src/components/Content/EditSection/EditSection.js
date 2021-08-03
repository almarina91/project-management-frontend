import {CLASS, VARIANTS} from "../../../utils/enums";
import { Button } from "react-bootstrap";
import CreateTask from "../ProjectSection/CreateTask";
import EditProject from "../ProjectSection/EditProject";
import TaskSection from "../ProjectSection/TaskSection";
import DeleteProject from "../ProjectSection/DeleteProject";
import { useEditContext } from "../../../context/editContext";

/**
 * A component that returns editing section.
 */

function EditSection(){

    const { addTaskChecked,
        setAddTaskChecked,
        showTaskDetails,
        editProjectChecked,
        setEditProjectChecked,
        deleteProjectChecked} = useEditContext();

    return(
        <>
            {(addTaskChecked || editProjectChecked || showTaskDetails || deleteProjectChecked) ?

                <div className={CLASS.rightProjectDivision}>
                    {addTaskChecked ?
                        <>
                            <Button className={CLASS.cancelButton} variant={VARIANTS.outlineDanger}
                                    onClick={() => setAddTaskChecked(!addTaskChecked)}>x</Button>
                            <CreateTask/>
                        </> :
                        null}
                    {editProjectChecked ?
                        <>
                            <Button className={CLASS.cancelButton} variant={VARIANTS.outlineDanger}
                                    onClick={() => setEditProjectChecked(!editProjectChecked)}>x</Button>
                            <EditProject/>
                        </> :
                        null}
                    {showTaskDetails ? <TaskSection/> : null}
                    {deleteProjectChecked ? <DeleteProject/> : null}
                </div> :
                null}
        </>
    )
}

export default EditSection;