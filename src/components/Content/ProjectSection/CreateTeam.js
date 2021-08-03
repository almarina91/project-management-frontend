import { Col, Form, Row } from "react-bootstrap";
import { CLASS } from "../../../utils/enums";
import UsersMultiple from "../common/UsersMultiple";
import UsersSelect from "../common/UsersSelect";
import { useNewProjectContext } from "../../../context/newProjectContext";

/**
 * A component that returns a form to create a team.
 */

function CreateTeam () {
    // in context because it is shared with other components
    const { adminID,
        setAdminID,
        projectManagerID,
        setProjectManagerID,
        developersIDs,
        setDevelopersIDs} = useNewProjectContext();

    const handleSelect = (selectedItems)=> {
        const devsIDs = [];
        for (let i=0; i<selectedItems.length; i++) {
            devsIDs.push(selectedItems[i].value);
        }
        setDevelopersIDs(devsIDs)
    }
    return(
            <Form.Group>
                <Col sm={10}>
                    <Form.Group as={Row}
                                controlId="formGridAdmin"
                                sm={4}>
                        <Col sm={4}>
                            <p className={CLASS.subtitleContent}>
                                admin
                            </p>
                        </Col>
                        <Col sm={4}>
                            <Form.Control size="sm"
                                          as="select"
                                          value={adminID}
                                          onChange={e=>setAdminID(e.target.value)}>
                                <UsersSelect/>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}
                                controlId="formGridPM"
                                sm={4}>
                        <Col sm={4}>
                            <p className={CLASS.subtitleContent}>
                                project manager
                            </p>
                        </Col>
                        <Col sm={4}>
                            <Form.Control size="sm"
                                          as="select"
                                          value={projectManagerID}
                                          onChange={e => setProjectManagerID(e.target.value)}>
                                <UsersSelect/>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}
                                controlId="exampleForm.Developers"
                                sm={4}>
                        <Col sm={4}>
                            <p className={CLASS.subtitleContent}>
                                developers
                            </p>
                        </Col>
                        <Col sm={4}>
                            <Form.Control as="select"
                                          multiple
                                          value={developersIDs}
                                          onChange={e=> {handleSelect(e.target.selectedOptions)}}>
                                <UsersMultiple/>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                </Col>
            </Form.Group>
    )
}

export default CreateTeam;