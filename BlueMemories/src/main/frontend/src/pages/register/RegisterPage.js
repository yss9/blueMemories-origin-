import React, { useState } from 'react';
import axios from 'axios';
import {Helmet} from "react-helmet";

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');


    const handleRegister = () => {
        axios.post('http://localhost:8080/register', {
            email: email,
            password: password,
            name : name,
            age : age,
            gender : gender
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error during registration:', error);
            });
    };

    return (
        <div>
            <Helmet>
            <title>Register</title>
            <meta name="description" content="BlueMemories Main App"/>
            </Helmet>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
            <input type="number" placeholder="Age" onChange={(e) => setAge(e.target.value)} />
            <input type="text" placeholder="Gender" onChange={(e) => setGender(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default RegisterForm;
