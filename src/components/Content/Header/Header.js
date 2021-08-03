import { CLASS } from "../../../utils/enums";
import { useDisplayContext } from "../../../context/displayContext";

/**
 * A component that returns a header.
 */

function Header() {
    const { setDisplayEditUser, setDisplayWelcome, setDisplayProject, setDisplayNewProject, setDisplayDeletedMessage, setDisplayLogOut } = useDisplayContext();

    return(
        <div className={CLASS.header}>
            <p className={CLASS.title}>project management app
                <button className={CLASS.headerButton}
                    onClick={()=> {
                    setDisplayEditUser(false)
                    setDisplayNewProject(false)
                    setDisplayProject(false)
                    setDisplayWelcome(false)
                    setDisplayDeletedMessage(false)
                    setDisplayLogOut(true)}}>
                log out</button>
                <button className={CLASS.headerButton}
                    onClick={()=>{
                    setDisplayEditUser(true)
                    setDisplayNewProject(false)
                    setDisplayProject(false)
                    setDisplayWelcome(false)
                    setDisplayDeletedMessage(false)
                    setDisplayLogOut(false)}}>
                edit user</button>
            </p>
        </div>
    )
}

export default Header;