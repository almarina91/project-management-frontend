import { CLASS } from "../../../utils/enums";
import { useCurrentProjectContext } from "../../../context/currentProjectContext";
import { useAllUsersContext } from "../../../context/allUsersContext";

function ProjectUsers(){

    const { allUsers } = useAllUsersContext();
    const { currentProject} = useCurrentProjectContext();
    const users = currentProject.usersInvolved;

    return(
        <>
            {users.map(user => {
                const userFound = allUsers.find(one => one._id === user.id)
                return <p
                    className={CLASS.elementsListed}> {user.role}: <strong>{userFound.name} {userFound.surname}</strong>
                </p>
            })}
        </>
    )
}

export default ProjectUsers;