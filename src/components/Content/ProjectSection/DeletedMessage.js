import { CLASS } from "../../../utils/enums";

/**
 * Displays a message that the project is deleted.
 */

function DeletedMessage(){
    return(
        <div className={CLASS.welcome}>
            <p className={CLASS.sectionTitle}>Project is deleted!</p>
        </div>
    )
}

export default DeletedMessage;