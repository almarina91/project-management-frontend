import { CLASS, ROLE } from "../../../utils/enums";
import { useEffect } from "react";
import { useGeneralContext } from "../../../context/generalContext";
import { useUserContext } from "../../../context/userContext";
import { useTasksContext } from "../../../context/tasksContext";
import { useCurrentProjectContext } from "../../../context/currentProjectContext";
import { useDisplayContext } from "../../../context/displayContext";
import { useEditContext } from "../../../context/editContext";
import { useRefreshProjectListContext } from "../../../context/refreshProjectListContext";

/**
 * A component that lists all the projects in a sidebar.
 */

function Projects () {
    const { userData, token, userProjects, setUserProjects } = useUserContext();
    const { setCurrentTask } = useTasksContext();
    const { setCurrentProject } = useCurrentProjectContext();
    const { refreshProjectList, setRefreshProjectList } = useRefreshProjectListContext();
    const { setDisplayWelcome,
        setDisplayProject,
        setDisplayNewProject,
        setDisplayDeletedMessage,
        setDisplayEditUser,
        setDisplayLogOut } = useDisplayContext();
    const { setAddTaskChecked, setShowTaskDetails } = useEditContext();
    const { requestUrl, projectsVisible, setProjectsVisible, setCurrentProjectRole } = useGeneralContext();

    // gets all projects that user is involved in and refreshes when a project is added/removed
    useEffect(()=>{
        if(Object.keys(userData).length !== 0) {
        fetch(`${requestUrl}/projects/${userData._id}`,{
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization':`Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                setUserProjects(data)
            })
            .then(() => setProjectsVisible(true))
            .then(() => setRefreshProjectList(false))
            .catch(e => console.log(e))
        }
    },[userData, refreshProjectList]);

    const handleNewProject = ()=> {
        setCurrentProjectRole(ROLE.admin)
        setDisplayNewProject(true)
        setDisplayProject(false)
        setDisplayWelcome(false)
        setDisplayDeletedMessage(false)
        setAddTaskChecked(false)
        setShowTaskDetails(false)
        setCurrentTask('')
        setDisplayEditUser(false)
        setDisplayLogOut(false)
    }

    const handleViewProject = project => {
        const usersInvolved = project.usersInvolved;
        const rolesOfUser = [];
        usersInvolved.forEach(user=>{
            if (user.id === userData._id){
                rolesOfUser.push(user.role)
            }
        })
        setCurrentProjectRole(rolesOfUser)

        setCurrentProject(project)

        setDisplayNewProject(false)
        setDisplayWelcome(false)
        setAddTaskChecked(false)
        setShowTaskDetails(false)
        setCurrentTask('')
        setDisplayProject(true)
        setDisplayDeletedMessage(false)
        setDisplayEditUser(false)
        setDisplayLogOut(false)
    }

    return(
        <>
            <p className={CLASS.listTitle} onClick={()=>handleNewProject()}>+ add a new project</p>
            <ul className={CLASS.list}>
                { projectsVisible ?
                    userProjects.map(project=>
                        <li className={CLASS.listTitle}
                            onClick={() => handleViewProject(project)}
                        >{project.name}</li>):
                    null }
            </ul>
        </>
    )
}

export default Projects;