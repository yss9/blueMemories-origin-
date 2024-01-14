import React from 'react';
import {Helmet} from "react-helmet";

const LoginForm = () => {
    return (
        <div>
            <Helmet>
            <title>Login</title>
            <meta name="description" content="BlueMemories Main App"/>
            </Helmet>
            <h1>Login Page</h1>
            <p>This is the Login Page.</p>
        </div>
    );
};

export default LoginForm;
