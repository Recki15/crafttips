import React, { useEffect, useState } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import LandingNavBar from '../Components/LandingNavbar';
import LoggedInNavbar from '../Components/LoggedInNavbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';


export const Home = () => {
  const [name, setName] = useState('');
  const [ispost, setpost] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    refreshToken();
    viewPost();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
        } catch (error) {
            if (error.response) {
            }
        }
      }

      const viewPost = async() =>{
        try {
          axios.get(`http://localhost:5000/posts`)
          .then(res => { 
              setpost(res.data);
          })
        } catch (error) { throw error;}
      }

      const navbarDecider = () =>{
        if(name.length > 0) {
          return <LoggedInNavbar />
        }else{
          return <LandingNavBar />}
      }
  return (
    <>
        {navbarDecider()}
       
    </>
  )
}
