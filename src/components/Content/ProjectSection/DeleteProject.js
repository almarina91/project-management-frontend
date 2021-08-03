import {CLASS, VARIANTS} from "../../../utils/enums";
import { Button } from "react-bootstrap";
import { useGeneralContext } from "../../../context/generalContext";
import { useEffect, useState } from "react";
import { useUserContext } from "../../../context/userContext";
import { useCurrentProjectContext } from "../../../context/currentProjectContext";
import { useEditContext } from "../../../context/editContext";
import { useDisplayContext } from "../../../context/displayContext";
import { useRefreshProjectListContext } from "../../../context/refreshProjectListContext";

/**
 * Returns options to remove a project.
 */

function DeleteProject () {
    const { requestUrl } = useGeneralContext();
    const { deleteProjectChecked, setDeleteProjectChecked } = useEditContext();
    const { token } = useUserContext();
    const { currentProject } = useCurrentProjectContext();
    const { setDisplayDeletedMessage, setDisplayProject } = useDisplayContext();
    const { setRefreshProjectList } = useRefreshProjectListContext();

    const [shouldFetch, setShouldFetch] = useState(false);

    // removes the project
    useEffect(() => {
        if (shouldFetch) {
            fetch(`${requestUrl}/projects/${currentProject._id}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
            })
                .then(res => res.json())
                .then(() => {
                    setDisplayProject(false)
                })
                .then(()=>setRefreshProjectList(true))
                .then(()=>setDeleteProjectChecked(false))
                .catch(e => console.log(e))
        }
    }, [shouldFetch])

    return (
        <>
            <p className={CLASS.subtitleContent}>Are you sure you want to delete the "{currentProject.name}"
                project?</p>
            <Button className={CLASS.subtitleContent}
                    variant={VARIANTS.outlineInfo}
                    onClick={() => {
                        setShouldFetch(true)
                        setDisplayDeletedMessage(true)
                    }}
            >yes</Button>
            <Button className={CLASS.subtitleContent}
                    variant={VARIANTS.outlineDanger}
                    onClick={() => setDeleteProjectChecked(!deleteProjectChecked)}
            >cancel</Button>
        </>
    )
}

export default DeleteProject;