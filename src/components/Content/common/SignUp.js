import { Button, Form, Card, Accordion } from "react-bootstrap";
import { BUTTON_TYPES, CLASS, CONTROL_ID, FORM_TYPES, VARIANTS, VALIDATE, ERRORS } from '../../../utils/enums';
import { useFormik } from 'formik';
import { useEffect, useState } from "react";
import { useGeneralContext } from "../../../context/generalContext";
import { useHistory } from "react-router-dom";
import { useUserContext } from "../../../context/userContext";

const validate = values => {
    const errors = {};
    if(!values.name) {
        errors.name = VALIDATE.required;
    }
    if(!values.surname) {
        errors.surname = VALIDATE.required;
    }
    if(!values.username){
        errors.username = VALIDATE.required;
    }
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

    if (!values.email) {
        errors.email = VALIDATE.required;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = ERRORS.invalidEmail;
    }
    return errors;
};

function SignUp() {
    const { requestUrl } = useGeneralContext();
    const { setUserData, setToken } = useUserContext();

    const [inputUserData, setInputUserData] = useState({});
    const [fetchError, setFetchError] = useState('');
    let history = useHistory();

    const [shouldFetch, setShouldFetch] = useState(false);

    const formik = useFormik({
        validateOnChange:false,
        validateOnBlur:false,
        initialValues: {
            email:'',
            password: '',
            surname:'',
            name:'',
            username:''
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
        if(shouldFetch){
            setFetchError('');
            fetch(`${requestUrl}/users`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(inputUserData)})
            .then(res => res.json())
            .then(data => {
                if(data.errors){
                    setFetchError(data.message)
                    throw Error
                } else if (Object.keys(data).length === 0) {
                    throw Error
                } else {
                    setToken(data.token)
                    setUserData(data.user)
                }
            })
            .then(()=> {
                if(fetchError === ''){
                    history.push("/home", {from: '/'});
                    setShouldFetch(false)}
                })
            .catch(e => {
                setShouldFetch(false)
                setUserData({})
                console.log(e)
            })
        }
    },[shouldFetch])

    return(
        <Accordion>
            <Card>
                <Accordion.Toggle as={Card.Header}  className={CLASS.newAccTitle} eventKey="1">
                    first time here?
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        <Form className={CLASS.formContainer}
                              autoComplete="off">
                            <div className={CLASS.newAccMessage}>start managing your work</div>
                            <Form.Group controlId={CONTROL_ID.formUsername}>
                                <Form.Control type={FORM_TYPES.username}
                                              placeholder={FORM_TYPES.username}
                                              data-testid="required-input-username"
                                              name={FORM_TYPES.username}
                                              onChange={formik.handleChange}
                                              value={formik.values.username}
                                              />
                                { formik.errors.username ?
                                    <div className={CLASS.inputErrors}>{formik.errors.username}</div>
                                    : null
                                }
                            </Form.Group>
                            <Form.Group controlId={CONTROL_ID.formName}>
                                <Form.Control type={FORM_TYPES.name}
                                              placeholder={FORM_TYPES.name}
                                              data-testid="required-input-name"
                                              name={FORM_TYPES.name}
                                              onChange={formik.handleChange}
                                              value={formik.values.name}/>
                                { formik.errors.name ?
                                    <div className={CLASS.inputErrors}>{formik.errors.name}</div>
                                    : null
                                }
                            </Form.Group>
                            <Form.Group controlId={CONTROL_ID.formSurname}>
                                <Form.Control type={FORM_TYPES.surname}
                                              placeholder={FORM_TYPES.surname}
                                              data-testid="required-input-surname"
                                              name={FORM_TYPES.surname}
                                              onChange={formik.handleChange}
                                              value={formik.values.surname}/>
                                { formik.errors.surname ?
                                    <div className={CLASS.inputErrors}>{formik.errors.surname}</div>
                                    : null
                                }
                            </Form.Group>
                            <Form.Group controlId={CONTROL_ID.formEmail}>
                                <Form.Control type={FORM_TYPES.email}
                                              placeholder={FORM_TYPES.email}
                                              data-testid="required-input-email"
                                              name={FORM_TYPES.email}
                                              onChange={formik.handleChange}
                                              value={formik.values.email}/>
                                { formik.errors.email ?
                                    <div className={CLASS.inputErrors}>{formik.errors.email}</div>
                                    : null
                                }
                            </Form.Group>
                            <Form.Group controlId={CONTROL_ID.formPassword}>
                                <Form.Control type={FORM_TYPES.password}
                                              placeholder={FORM_TYPES.password}
                                              data-testid="required-input-password"
                                              name={FORM_TYPES.password}
                                              onChange={formik.handleChange}
                                              value={formik.values.password}/>
                                { formik.errors.password ?
                                    <div className={CLASS.inputErrors}>{formik.errors.password}</div>
                                    : null
                                }
                            </Form.Group>
                            { fetchError !== '' ?
                                <div className={CLASS.inputErrors}>{fetchError}</div>
                                : null
                            }
                            <Button variant={VARIANTS.success}
                                    type={BUTTON_TYPES.submit}
                                    onClick={(event) => submitHandler(event)}>
                                sign up now
                            </Button>
                        </Form>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}

export default SignUp;