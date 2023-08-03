import { useState, useEffect, useContext } from "react";
import { backendUrl } from "../../config";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contextApi/AuthContext';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import './auth.scss';

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { currentUser, login } = useContext(AuthContext); //access the shared state


    const submitLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${backendUrl}/user/login`, {
                username: username,
                password: password
            });

            console.log(res.data);

            const { token } = res.data;
            await login(token); //set token in local storage and context state

            // Navigate to home page after successful login
            // navigate('/');
        } catch (err) {
            console.log(err);
            //set the error message
            setErrorMessage(err.response.data.message);
        }


    };

    //navigate to the homepage ('/') when the currentUser state is updated after succesful login
    useEffect(() => {
        if (currentUser) {
            navigate('/dashboard');
        }
    }, [currentUser, navigate]);


    return (
        <div className='grid-box'>

            <div className='auth-box'>
            </div>
            <div className='form'>
                <div className='auth-header'>
                    <h3>Login here</h3>
                </div>
                <form onSubmit={submitLogin} className='auth-form'>
                    <TextField
                        id='outlined-basic'
                        name="username"
                        label='Username'
                        // placeholder='username'
                        variant='outlined'
                        autoComplete='username'
                        autoFocus
                        required
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                    <TextField
                        id='outlined-password-input'
                        name="password"
                        label='Password'
                        type='password'
                        required

                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />


                    <Button type='submit' variant='contained'>
                        Login
                    </Button>
                </form>
                {errorMessage && <p>{errorMessage}</p>}


                <div className='button-container'>
                    <span>Don't have an account?</span>
                    <Link to="/register">
                        <Button type='submit' variant='contained' color="secondary">Register</Button>
                    </Link>
                </div>
            </div>


        </div>
    );

}

export default Login;