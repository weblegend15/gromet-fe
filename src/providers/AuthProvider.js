import React from "react";
import { useNavigate } from "react-router-dom";
const AuthProvider = (props) => {
    return <React.Fragment>
        {props.children}
    </React.Fragment>;
    // const navigate = useNavigate();
    // const accessToken = localStorage.getItem('accessToken');
    // console.log("LOG", "NAVIGATE", accessToken);
    // if (accessToken === "" || !accessToken) {
    //     navigate(props.redirect);
    // }
    // return (accessToken === "" || !accessToken) ? <></> : props.children
}

export default AuthProvider;