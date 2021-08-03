import { CLASS } from "../../../utils/enums";
import { useCurrentProjectContext } from "../../../context/currentProjectContext";

/**
 * A component that returns project details.
 */

function ProjectDescription(){

    const { currentProject} = useCurrentProjectContext();

    return(
        <>
            <p className={CLASS.projectTitle}>{currentProject.name}</p>
            <p className={CLASS.subtitleContent}>details: </p>
            <p className={CLASS.elementsListed}>project code: <strong>{currentProject.code}</strong></p>
            <p className={CLASS.subtitleContent}>team:</p>
        </>
    )
}

export default ProjectDescription;