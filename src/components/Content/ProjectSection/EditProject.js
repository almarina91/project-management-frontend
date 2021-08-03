import {CLASS, ROLE, VARIANTS} from "../../../utils/enums";
import { useGeneralContext } from "../../../context/generalContext";
import UsersSelect from "../common/UsersSelect";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import UsersMultiple from "../common/UsersMultiple";
import { useUserContext } from "../../../context/userContext";
import { useCurrentProjectContext } from "../../../context/currentProjectContext";
import { useRefreshProjectListContext } from "../../../context/refreshProjectListContext";

/**
 * Returns a form to edit a project.
 */

function EditProject() {
    const { requestUrl } = useGeneralContext();
    const { currentProject, setCurrentProject } = useCurrentProjectContext();
    const { token } = useUserContext();
    const { setRefreshProjectList } = useRefreshProjectListContext();

    const [newAdminID, setNewAdminID] = useState('');
    const [newProjectManagerID, setNewProjectManagerID] = useState('');
    const [newDevelopersIDs, setNewDevelopersIDs] = useState([]);

    let newProjectTitle = useRef(currentProject.name);
    let newProjectCode = useRef(currentProject.code);

    const [shouldFetch, setShouldFetch] = useState(false);
    const [updatedInput, setUpdatedInput] = useState({})

    const handleSelect = (selectedItems)=> {
        const devsIDs = [];
        for (let i=0; i<selectedItems.length; i++) {
            devsIDs.push(selectedItems[i].value);
        }
        setNewDevelopersIDs(devsIDs)
    }
    const handleSubmit = () => {
        const developers = []
        newDevelopersIDs.forEach(dev=>developers.push({id:dev, role: ROLE.developer}))

        setUpdatedInput({
            name:newProjectTitle.current.value,
            code: newProjectCode.current.value,
            usersInvolved:[
                {id:newAdminID,
                role: ROLE.admin},
                {id:newProjectManagerID,
                role: ROLE.projectManager},
                ...developers
        ]})
        setShouldFetch(true)
    }

    useEffect(()=>{
        if(shouldFetch){
        fetch(`${requestUrl}/projects/${currentProject._id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            body: JSON.stringify(updatedInput)
        })
            .then(res=>res.json())
            .then(data=>setCurrentProject(data))
            .then(()=>setShouldFetch(false))
            .then(()=>setRefreshProjectList(true))
            .catch(e=>console.log(e))
        }
    },[shouldFetch]);

    return(
        <div className={CLASS.editSection}>
            <Form.Group>
                <Col sm={12}>
                    <Form.Group as={Row}>
                        <Col sm={10}>
                            <span className={CLASS.subtitleContent}>project title:</span>
                            <Form.Control size='sm'
                                          as='input'
                                          placeholder={currentProject.name}
                                          ref={newProjectTitle}>
                            </Form.Control>

                            <span className={CLASS.subtitleContent}>project code:</span>
                            <Form.Control size='sm'
                                          as='input'
                                          placeholder={currentProject.code}
                                          ref={newProjectCode}>
                            </Form.Control>

                            <span className={CLASS.subtitleContent}>admin:</span>
                            <Form.Control size="sm"
                                          as="select"
                                          value={newAdminID}
                                          onChange={e=>setNewAdminID(e.target.value)}>
                                <UsersSelect/>
                            </Form.Control>

                            <span className={CLASS.subtitleContent}>project manager:</span>
                            <Form.Control size="sm"
                                          as="select"
                                          value={newProjectManagerID}
                                          onChange={e=>setNewProjectManagerID(e.target.value)}>
                                <UsersSelect/>
                            </Form.Control>

                            <span className={CLASS.subtitleContent}>developers:</span>
                            <Form.Control as="select"
                                          multiple
                                          value={newDevelopersIDs}
                                          onChange={e=> {handleSelect(e.target.selectedOptions)}}>
                                <UsersMultiple/>
                            </Form.Control>

                        </Col>
                    </Form.Group>
                    {(newAdminID !== '' && newProjectManagerID !=='' && newDevelopersIDs.length !==0)?
                        <Button variant={VARIANTS.info}
                             onClick={() => handleSubmit()}>save changes</Button>:
                        <Button variant={VARIANTS.info} disabled>please fill in all fields</Button>
                    }
                </Col>
            </Form.Group>
        </div>
    )
}

export default EditProject;