import { useAllUsersContext } from "../../../context/allUsersContext";

/**
 * Options for selecting one of the users.
 */

function UsersSelect(){
    const { allUsers } = useAllUsersContext();
    return(
    <>
        <option>select user...</option>
        { allUsers.map((user, key) =>
            <option value={user._id} key={key}>{user.name} {user.surname}</option>) }
    </>
    )
}

export default UsersSelect;