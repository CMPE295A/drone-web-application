import React, {useState} from "react";
import {backendUrl} from "../../config";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();


    const submitLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${backendUrl}/user/login`, {
                username: username,
                password: password
            });

            console.log(res.data);

            // Navigate to home page after successful login
            navigate('/');
        } catch (err) {
            console.log(err);
            //set the error message
            setErrorMessage(err.response.data.message);
        }


    };

    return (
        <div>
            <h3>Login</h3>
            <form onSubmit={submitLogin}>
                <input placeholder="username" type='text' required onChange={(e) => {
                    setUsername(e.target.value);
                }}/>
                <input placeholder="password" type='password' required onChange={(e) => {
                    setPassword(e.target.value);
                }}/>

                <button type="submit">

                    Login
                </button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}

        </div>
    );

}

export default Login;