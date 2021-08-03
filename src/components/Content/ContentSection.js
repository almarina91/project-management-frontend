import ProjectSection from "./ProjectSection/ProjectSection";
import Welcome from "./WelcomeSection/Welcome";
import { CLASS } from "../../utils/enums";
import CreateNewProject from "./CreateNewProject/CreateNewProject";
import { NewProjectContextProvider } from "../../context/newProjectContext";
import { useDisplayContext } from "../../context/displayContext";
import { EditContextProvider } from "../../context/editContext";
import { TasksContextProvider } from "../../context/tasksContext";
import DeletedMessage from "./ProjectSection/DeletedMessage";
import EditUser from "./EditUser/EditUser";
import LogOut from "./LogOut/LogOut";

/**
 * A container component.
 */

function ContentSection() {

    const { displayWelcome,
        displayProject,
        displayNewProject,
        displayDeletedMessage,
        displayEditUser,
        displayLogOut
    } = useDisplayContext();

    return (
        <NewProjectContextProvider>
                <div className={CLASS.content}>
                    { displayWelcome ? <Welcome/> : null}
                    <EditContextProvider>
                        <TasksContextProvider>
                        { displayProject ? <ProjectSection/> : null}
                        </TasksContextProvider>
                    </EditContextProvider>
                        { displayNewProject ? <CreateNewProject/> : null}
                    { displayDeletedMessage ? <DeletedMessage/> :null}
                    { displayEditUser ?
                    <EditUser/>: null}
                    {displayLogOut ?
                    <LogOut/>: null}
                </div>
        </NewProjectContextProvider>
    )
}

export default ContentSection;