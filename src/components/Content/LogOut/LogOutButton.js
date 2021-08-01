import {BUTTON_TYPES, VARIANTS} from "../../../utils/enums";
import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useGeneralContext } from "../../../context/generalContext";
import { useUserContext } from "../../../context/userContext";

function LogOutButton(){
    let history = useHistory();

    const { requestUrl } = useGeneralContext();
    const { token } = useUserContext();

    const [shouldFetch, setShouldFetch] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault()
        setShouldFetch(true)
    }
    useEffect(()=>{
        if(shouldFetch){
            fetch(`${requestUrl}/users/logout`, {
                method: 'POST',
                headers:{'Content-Type': 'application/json', 'Authorization':`Bearer ${token}`}
            })
            .then(()=>history.push("/", {from: '/home'}))
            .catch(e=>console.log(e))
        }
    }, [shouldFetch])

    return(
        <Button variant={VARIANTS.outlineInfo}
                type={BUTTON_TYPES.submit}
                onClick={e=>handleSubmit(e)}>this device</Button>
    )
}

export default LogOutButton;