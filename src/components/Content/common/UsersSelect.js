import { useAllUsersContext } from "../../../context/allUsersContext";

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