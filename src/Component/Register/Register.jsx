import React from 'react';
import { useState } from 'react';
import RegisterBody from './RegisterBody/RegisterBody';
import RegisterTop from './RegisterTop/RegisterTop';

const Register = () => {
    // const [registrationType, setRegistrationType] = useState('user');
    const [userRegistration, setUserRegistration] = useState(true);
    return(
        <>
            <RegisterTop userRegistration={userRegistration} setUserRegistration={setUserRegistration} />
            <RegisterBody userRegistration={userRegistration} setUserRegistration={setUserRegistration} />
        </>
    )
}

export default Register;