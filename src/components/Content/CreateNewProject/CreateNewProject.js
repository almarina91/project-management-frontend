import React, { useRef } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import CreateTeam from "../ProjectSection/CreateTeam";
import {CLASS, ROLE} from "../../../utils/enums";
import { useEffect,  useState } from "react";
import { useGeneralContext } from "../../../context/generalContext";
import { useNewProjectContext } from "../../../context/newProjectContext";
import { useAllUsersContext } from "../../../context/allUsersContext";
import { useUserContext } from "../../../context/userContext";
import { useCurrentProjectContext } from "../../../context/currentProjectContext";
import { useRefreshProjectListContext } from "../../../context/refreshProjectListContext";

/**
 * A component that returns a section to create a new project.
 */

function CreateNewProject() {

    const { requestUrl, setProjectsVisible } = useGeneralContext();
    const { setCurrentProject } = useCurrentProjectContext();
    const { allUsers } = useAllUsersContext();
    const { token } = useUserContext();
    const { adminID, projectManagerID, developersIDs, setShowTasks } = useNewProjectContext();
    const { setRefreshProjectList } = useRefreshProjectListContext();

    const [fetchProject, setFetchProject] = useState(false);

    let projectTitle = useRef('');
    let projectCode = useRef('');
    let inputProject = {};

    useEffect(() => {
        if (fetchProject) {
            const developersSet = []
            for (let i = 0; i < developersIDs.length; i++) {
                const dev = allUsers.filter(user => user._id === developersIDs[i])[0]
                const completeDev = { "id":dev._id, "role": ROLE.developer}
                developersSet.push(completeDev)
            }
            inputProject = {
                "name": projectTitle.current.value,
                "code": projectCode.current.value,
                "usersInvolved":
                    [{"id":adminID, "role": ROLE.admin},
                        {"id":projectManagerID, "role": ROLE.projectManager},
                        ...developersSet
                    ]
            }
            fetch(`${requestUrl}/projects`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
                body: JSON.stringify(inputProject)
            })
                .then(res => res.json())
                .then(data => {
                    setCurrentProject(data)
                })
                .then(() => {
                    setFetchProject(false)
                    setShowTasks(true)
                    setProjectsVisible(true)
                })
                .then(()=>setRefreshProjectList(true))
                .catch(e => console.log(e))
        }
    }, [fetchProject])

    return (
        <Form>
            <Form.Label as="legend" column sm={10} className={CLASS.projectTitle}>
                create new project
            </Form.Label>
                <Form.Group>
                    <Form.Label as="legend" column sm={10} className={CLASS.subtitleContent}>
                        project details
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Group as={Row} controlId="formGridTitle" >
                            <Col sm={4}>
                                <p  className={CLASS.subtitleContent}>project title</p>
                            </Col>
                            <Col sm={4}>
                                <Form.Control type="text" ref={projectTitle}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formGridAdmin" sm={4}>
                            <Col sm={4}>
                                <p  className={CLASS.subtitleContent}>project code</p>
                            </Col>
                            <Col sm={4}>
                                <Form.Control type="text" ref={projectCode}/>
                            </Col>
                         </Form.Group>
                    </Col>
                </Form.Group>
                <CreateTeam/>
                <Form.Group as={Row}>
                    <Col sm={{span: 10}}>
                        { (inputProject.name !== '' &&
                            inputProject.code !== '' &&
                            adminID !== '' &&
                            projectManagerID!=='' &&
                            developersIDs.length !==0 ) ?
                            <Button type="submit"
                                    className={CLASS.saveButton}
                                    variant="info"
                                    onClick={e => {
                                        e.preventDefault()
                                        setFetchProject(true)
                                    }}
                            >Save project</Button> :
                            <p className={CLASS.fillInAllMessage}>
                                please fill in all form fields in order to save the project
                            </p>}
                    </Col>
                </Form.Group>
        </Form>
    )
}
export default CreateNewProject;