import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import LandingNavBar from '../Components/LandingNavbar';
import LoggedInNavbar from '../Components/LoggedInNavbar';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import Grid from '@mui/material/Grid';
import { width } from '@mui/system';

export const Post = () => {
    const { ids } = useParams();
    const [ispost, setpost] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        refreshToken();
        viewPostById();
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

    const viewPostById = async() =>{
        try {
          await axios.get(`http://localhost:5000/findPostById/${ids}`)
          .then(res => { 
              setpost(res.data);
              console.log(ispost)
          })
        } catch (error) { throw error;}
      }

    const navbarDecider = () => {
        if (name.length > 0) {
            return <LoggedInNavbar />
        } else {
            return <LandingNavBar />
        }
    }

    return (
        <>
            {navbarDecider()}
            <Grid container spacing={2}>
                <Grid item xs={4}>
                  xs=8
                </Grid>
                <Grid item xs={8}>

                        <h1>{ispost.title}</h1>
                        <img src={ispost.cover_image}></img>
                        <div dangerouslySetInnerHTML={{ __html: ispost.long_desc}}  />

                </Grid>
                <Grid item xs={4}>
                   xs=4
                </Grid>
            </Grid>
           
        </>
    )
}
