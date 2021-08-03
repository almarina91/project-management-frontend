import { OPTION_VALUES } from "../../../utils/enums";

/**
 * Options for status.
 */

function StatusSelection (){
    return(
        <>
            <option value={OPTION_VALUES.new}>new</option>
            <option value={OPTION_VALUES.inProgress}>in progress</option>
            <option value={OPTION_VALUES.finished}>finished</option>
        </>
    )
}

export default StatusSelection;