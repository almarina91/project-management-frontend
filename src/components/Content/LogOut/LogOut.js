import { Col, Form } from "react-bootstrap";
import { CLASS } from "../../../utils/enums";
import React from "react";
import LogOutAllButton from "./LogOutAllButton";
import LogOutButton from "./LogOutButton";

function LogOut(){
    return(
        <Form>
            <Form.Label className={CLASS.projectTitle}>
                log out
            </Form.Label>
            <Form.Group>
                <p className={CLASS.subtitleContent}>
                    where do you want to log out from?
                </p>
                <Col sm={10}>
                    <Col sm={4}>
                        <p  className={CLASS.subtitleContent}>
                            <LogOutButton/>
                        </p>
                    </Col>
                    <Col sm={4}>
                        <p  className={CLASS.subtitleContent}>
                            <LogOutAllButton/>
                        </p>
                    </Col>
                </Col>
            </Form.Group>
        </Form>
    )
}

export default LogOut;