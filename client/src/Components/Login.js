import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import {Link } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    let navigate = useNavigate();

    const Auth = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/login', {
                email: email,
                password: password
            });
            navigate("/");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
                hasError(error.response.data.msg);
            }
        }
    }

    const hasError = (e) => {
        if(e.length === 0 ){
            document.getElementById('error').hidden=true;
        } else {document.getElementById('error').hidden=false;}
    }
    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form onSubmit={Auth} className="box">
                                <div hidden id='error'>
                                <Alert severity="error">{msg}</Alert>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Email or Username</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <button className="button is-success is-fullwidth">Login</button>
                                </div>
                                <div className="field mt-5">
                                    <br/>
                                    <label className="label">You don't have an account yet?</label>
                                    <Link to='/register'>Click here to register now!</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
