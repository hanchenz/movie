import React from 'react';
import { googleLogout } from '@react-oauth/google';

import "./Logout.css";

function Logout({ setUser }){
    const onSuccess = () => {
        googleLogout();
        setUser(null);
        localStorage.setItem("login", null);
        console.log('Logout made successfully');
    };

    return (
        <button class = "button" onClick={() => onSuccess()}>
            Log Out
        </button>
    );
}

export default Logout;