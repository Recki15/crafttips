import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
    let navigate = useNavigate();

    useEffect(() => {
        Logout();
    }, []);
    const Logout = async () => {
        try {
            await axios.delete('http://localhost:5000/logout');
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div></div>
  )
}
