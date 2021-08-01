import { CLASS } from "../../../utils/enums";

function DeletedMessage(){
    return(
        <div className={CLASS.welcome}>
            <p className={CLASS.sectionTitle}>Project is deleted!</p>
        </div>
    )
}

export default DeletedMessage;