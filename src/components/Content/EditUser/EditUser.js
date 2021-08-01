import {BUTTON_TYPES, CLASS, CONTROL_ID, ERRORS, FORM_TYPES, VALIDATE, VARIANTS} from "../../../utils/enums";
import { Button, Col, Form, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../../../context/userContext";
import { useFormik } from 'formik';
import { useGeneralContext } from "../../../context/generalContext";

const validate = values => {
    const errors = {};

    if (!values.password) {
        errors.password = VALIDATE.required;
    } else if(values.password.length < 8){
        errors.password = ERRORS.eightCharacters;
    } else if(!/[A-Z]/.test(values.password)){
        errors.password = ERRORS.uppercase;
    } else if(!/[a-z]/.test(values.password)){
        errors.password = ERRORS.lowercase;
    } else if(!/[0-9]/.test(values.password)){
        errors.password = ERRORS.number;
    } else if(!/[@#$^+=!]/.test(values.password)){
        errors.password = ERRORS.specialChar;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = ERRORS.invalidEmail;
    }
    return errors;
};

function EditUser(){
    const { requestUrl } = useGeneralContext();
    const { userData, token, setUserData } = useUserContext();

    const [shouldFetch, setShouldFetch] = useState(false);
    const [inputUserData, setInputUserData] = useState({});
    const [displaySuccessMessage, setDisplaySuccessMessage] = useState(false);

    const formik = useFormik({
        validateOnBlur:false,
        initialValues: {
            email:userData.email,
            password: '',
            surname:userData.surname,
            name:userData.name,
            username:userData.username
        },
        validate,
        onSubmit: values => {
            setInputUserData(values)
            setShouldFetch(true)
        },
    });
    const submitHandler = async(event) => {
        event.preventDefault();
        formik.handleSubmit(event);
    }
    useEffect(()=>{
        if(shouldFetch) {
            fetch(`${requestUrl}/users/${userData._id}`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json','Authorization': `Bearer ${token}` },
                body: JSON.stringify(inputUserData)}
            )
                .then(res=>res.json())
                .then(data=>setUserData(data))
                .then(()=>setDisplaySuccessMessage(true))
                .catch(e=>console.log(e))
        }
    },[shouldFetch])

    return(
        <Form onSubmit={formik.handleSubmit}>
            <Form.Label as="legend" column sm={10} className={CLASS.projectTitle}>
                edit user data
            </Form.Label>
            <Form.Group>
                <Form.Label as="legend" column sm={10} className={CLASS.subtitleContent}>
                    user details
                </Form.Label>
                <Col sm={10}>
                    <Form.Group as={Row} controlId={CONTROL_ID.formUsername} sm={4}>
                        <Col sm={4}>
                            <p  className={CLASS.subtitleContent}>username</p>
                        </Col>
                        <Col sm={4}>
                            <Form.Control placeholder={userData.username}
                                          type={FORM_TYPES.username}
                                          data-testid="required-input-edit-username"
                                          name={FORM_TYPES.username}
                                          onChange={formik.handleChange}
                                          value={formik.values.username}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId={CONTROL_ID.formName}>
                        <Col sm={4}>
                            <p  className={CLASS.subtitleContent}>name</p>
                        </Col>
                        <Col sm={4}>
                            <Form.Control type={FORM_TYPES.name}
                                          placeholder={FORM_TYPES.name}
                                          data-testid="required-input-edit-name"
                                          name={FORM_TYPES.name}
                                          onChange={formik.handleChange}
                                          value={formik.values.name}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId={CONTROL_ID.formSurname} sm={4}>
                        <Col sm={4}>
                            <p  className={CLASS.subtitleContent}>surname</p>
                        </Col>
                        <Col sm={4}>
                            <Form.Control type={FORM_TYPES.surname}
                                          placeholder={FORM_TYPES.surname}
                                          data-testid="required-input-edit-surname"
                                          name={FORM_TYPES.surname}
                                          onChange={formik.handleChange}
                                          value={formik.values.surname}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId={CONTROL_ID.formEmail} sm={4}>
                        <Col sm={4}>
                            <p  className={CLASS.subtitleContent}>email</p>
                        </Col>
                        <Col sm={4}>
                            <Form.Control type={FORM_TYPES.email}
                                          placeholder={FORM_TYPES.email}
                                          data-testid="required-input-edit-email"
                                          name={FORM_TYPES.email}
                                          onChange={formik.handleChange}
                                          value={formik.values.email}/>
                            { formik.errors.email ?
                                <div className={CLASS.inputErrors}>{formik.errors.email}</div>
                                : null
                            }
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId={CONTROL_ID.formPassword} sm={4}>
                        <Col sm={4}>
                            <p className={CLASS.subtitleContent}>password</p>
                        </Col>
                        <Col sm={4}>
                            <Form.Control type={FORM_TYPES.password}
                                          placeholder={FORM_TYPES.password}
                                          data-testid="required-input-edit-password"
                                          name={FORM_TYPES.password}
                                          onChange={formik.handleChange}
                                          value={formik.values.password}/>
                            { formik.errors.password ?
                                <div className={CLASS.inputErrors}>{formik.errors.password}</div>
                                : null
                            }
                        </Col>
                    </Form.Group>
                    {displaySuccessMessage ?
                        <p className={CLASS.subtitleContent}> changes saved! </p>
                        :
                        <Button variant={VARIANTS.outlineInfo}
                                type={BUTTON_TYPES.submit}
                                onClick={event => submitHandler(event)}>
                            save changes
                        </Button>
                    }
                </Col>
            </Form.Group>
         </Form>
    )
}

export default EditUser;