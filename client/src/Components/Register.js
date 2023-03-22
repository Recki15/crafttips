import React, { useState } from 'react'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import '../Pages/Background.css';

export const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState('');
    let navigate = useNavigate();

    const Register = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/users', {
                name: name,
                email: email,
                password: password,
                confPassword: confPassword
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
        
        <section className="hero gradient-custom-3 is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                        <div className='box-shadow'>
                            <form onSubmit={Register} className="box">
                                <div className="field mt-5">
                                    <label className="label">Name</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Name" minLength={5} maxLength={30}
                                            value={name} onChange={(e) => setName(e.target.value)} required/>
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Email</label>
                                    <div className="controls">
                                        <input type={"email"} className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6}/>
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Confirm Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} required minLength={6}/>
                                    </div>
                                </div>
                                <div hidden id='error'>
                                <Alert severity="error">{msg}</Alert>
                                </div>
                                <div className="buttondiv">
                                    <button className="loginbutton">Register</button>
                                </div>
                                <div className="field mt-5">
                                    <br/>
                                    <label className="label">You already have an account?</label>
                                    <Link to='/login'>Click here to login!</Link>
                                </div>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
