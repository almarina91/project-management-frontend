import {CLASS, ROLE, VARIANTS} from "../../../utils/enums";
import { useGeneralContext } from "../../../context/generalContext";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useUserContext } from "../../../context/userContext";
import { useCurrentProjectContext } from "../../../context/currentProjectContext";
import { useEditContext } from "../../../context/editContext";
import ProjectDescription from "./ProjectDescription";
import ProjectUsers from "./ProjectUsers";
import ProjectTasks from "./ProjectTasks";
import EditSection from "../EditSection/EditSection";

function ProjectSection() {

    const { token } = useUserContext();
    const { currentProject, setTasksForCurrentProject } = useCurrentProjectContext();
    const { requestUrl, currentProjectRole } = useGeneralContext();
    const { setAddTaskChecked,
        setShowTaskDetails,
        editProjectChecked,
        setEditProjectChecked,
        setDeleteProjectChecked,
        deleteProjectChecked} = useEditContext();

    // get tasks for a project
    useEffect(() => {
        fetch(`${requestUrl}/tasks/${currentProject._id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
        })
            .then(res => res.json())
            .then(data => setTasksForCurrentProject(data))
            .catch(e => console.log(e))
    }, [currentProject])

    return (
        <div className={CLASS.projectSection}>
            <div className={CLASS.leftProjectDivision}>
                <ProjectDescription/>
                <ProjectUsers/>
                <ProjectTasks/>
                {(currentProjectRole.includes(ROLE.admin) || currentProjectRole.includes(ROLE.projectManager))?
                    <Button className={CLASS.subtitleContent} variant={VARIANTS.outlineInfo}
                            onClick={() => {
                                setEditProjectChecked(!editProjectChecked)
                                setAddTaskChecked(false)
                                setShowTaskDetails(false)
                                setDeleteProjectChecked(false)
                            }}>edit</Button>:
                    null}
                {currentProjectRole.includes(ROLE.admin) ?
                    <Button className={CLASS.subtitleContent} variant={VARIANTS.outlineInfo}
                            onClick={() => {
                                setAddTaskChecked(false)
                                setShowTaskDetails(false)
                                setEditProjectChecked(false)
                                setDeleteProjectChecked(!deleteProjectChecked)
                            }}>delete project</Button>
                    :null}
            </div>
            <EditSection/>
        </div>
    )
}

export default ProjectSection;