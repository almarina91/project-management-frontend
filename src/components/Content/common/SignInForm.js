import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Accordion, Button, Card, Form } from "react-bootstrap";
import { BUTTON_TYPES, CLASS, CONTROL_ID, FORM_TYPES, VARIANTS, VALIDATE, ERRORS } from '../../../utils/enums';
import { useFormik } from 'formik';
import { useGeneralContext } from "../../../context/generalContext";
import { useUserContext } from "../../../context/userContext";

const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = VALIDATE.required;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = VALIDATE.emailError;
    }
    if (!values.password) {
        errors.password = VALIDATE.required;
    }
    return errors;
};

function SignInForm(){
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
            password: ''
        },
        validate,
        onSubmit: values => {
            setInputUserData(values)
            setFetchError('');
            setShouldFetch(true)
        },
    });

    const submitHandler = async(event) => {
        event.preventDefault();
        formik.handleSubmit(event);
    }

    useEffect(()=>{
        if(shouldFetch){
            fetch(`${requestUrl}/users/login`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(inputUserData)})
                .then(res => res.json())
                .then(data => {
                    if(data.errors){
                        setFetchError(data.message)
                        throw Error
                    } else if (Object.keys(data).length === 0) {
                        setFetchError(ERRORS.wrongInput)
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
                <Accordion.Toggle as={Card.Header} className={CLASS.welcomeTitle} eventKey="0">
                    welcome back!
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Form className={CLASS.formContainer} autoComplete="off">
                            <div className={CLASS.welcomeMessage}>continue managing your work</div>
                            <Form.Group controlId={CONTROL_ID.formEmail}>
                                <Form.Control type={FORM_TYPES.email}
                                              placeholder={FORM_TYPES.email}
                                              data-testid="required-input-email"
                                              name={FORM_TYPES.email}
                                              onChange={formik.handleChange}
                                              value={formik.values.email}/>
                                { formik.errors.email ? <div className={CLASS.inputErrors}>{formik.errors.email}</div> : null}
                            </Form.Group>
                            <Form.Group controlId={CONTROL_ID.formPassword}>
                                <Form.Control type={FORM_TYPES.password}
                                              placeholder={FORM_TYPES.password}
                                              data-testid="required-input-password"
                                              name={FORM_TYPES.password}
                                              onChange={formik.handleChange}
                                              value={formik.values.password}/>
                                { formik.errors.password ? <div className={CLASS.inputErrors}>{formik.errors.password}</div> : null}
                            </Form.Group>
                            { fetchError !== '' ?
                                <div className={CLASS.inputErrors}>{fetchError}</div>
                                : null
                            }
                            <br/>
                            <Button variant={VARIANTS.info}
                                    type={BUTTON_TYPES.submit}
                                    onClick={(event) => submitHandler(event)}>
                                sign in now
                            </Button>
                        </Form>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}

export default SignInForm;