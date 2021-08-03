import { useAllUsersContext } from "../../../context/allUsersContext";

/**
 * Options for selecting users.
 */

function UsersMultiple(){
    const { allUsers } = useAllUsersContext();
    return(
        <>
            {allUsers.map((user, key)=><option value={user._id} key={key}>{user.name} {user.surname}</option>)}
        </>
    )
}

export default UsersMultiple;