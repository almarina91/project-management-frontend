import { Accordion, Card } from "react-bootstrap";
import { CLASS } from "../../../utils/enums";
import Projects from "./Projects";
import { NewProjectContextProvider } from "../../../context/newProjectContext";
import { useUserContext } from "../../../context/userContext";
import { TasksContextProvider } from "../../../context/tasksContext";
import { EditContextProvider } from "../../../context/editContext";

function SideBar() {

    const { userData } = useUserContext();

    return (
        <NewProjectContextProvider>
                <div className={CLASS.sideBar}>
                    <p className={CLASS.sectionTitle}>Hello, {userData.name} {userData.surname}</p>
                    <Accordion defaultActiveKey="0">
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0" className={CLASS.subSectionTitle}>
                                projects &#x25BF;
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <TasksContextProvider>
                                        <EditContextProvider>
                                        <Card.Body className={CLASS.cardBody}>
                                            <Projects/>
                                        </Card.Body>
                                        </EditContextProvider>
                                </TasksContextProvider>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </div>
        </NewProjectContextProvider>
    )
}

export default SideBar;