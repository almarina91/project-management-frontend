import { CLASS, ROLE, VARIANTS } from "../../../utils/enums";
import { Button } from "react-bootstrap";
import { useUserContext } from "../../../context/userContext";

/**
 * A component that returns welcome screen.
 */

function Welcome() {

    const { userData } = useUserContext();

    return(
        <div className={CLASS.welcome}>
            <p className={CLASS.sectionTitle}>Welcome, {userData.name}!</p>
            <p className={CLASS.subtitleContent}>choose a project from the sidebar to see the details</p>
            { userData.role === ROLE.admin?
                <>
                    <p className={CLASS.subtitleContent}>or create a new project</p>
                    <Button variant={VARIANTS.info}
                            className={CLASS.smallButton}>
                        +
                    </Button>
                </>
                :null
            }
        </div>
    )
}

export default Welcome;