import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import Grid from '@mui/material/Grid';
import "./Background.css";
import LoggedInNavbar from '../Components/LoggedInNavbar';
import LandingNavbar from '../Components/LandingNavbar';

export const Posts = () => {
    const [name, setName] = useState('');
    const { ids } = useParams();
    const [ispost, setpost] = useState([]);
    let navigate = useNavigate();
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
              if(res.data.active === 0){
                window.alert("No permission!")
                navigate('/');
              }
          })
        } catch (error) { throw error;}
      }

      const navbarDecider = () =>{
        if(name.length > 0) {
          return <LoggedInNavbar />
        }else{
          return <LandingNavbar />}
      }
    return (
        <>
        {navbarDecider()}
            <Grid container>
                <Grid item xs={2}>
                <h1 style={{color:'aqua', border: '1px solid green'}}>xs2</h1>
                </Grid>
                <Grid item xs={8}>
                    <div id='postWrap'>
                        <h1>{ispost.title}</h1>
                        <img src={ispost.cover_image}></img>
                        <div dangerouslySetInnerHTML={{ __html: ispost.long_desc}}  id="post"/>
                    </div>
                </Grid>
                <Grid item xs={2}>
                <h1 style={{color:'aqua', border: '1px solid green'}}>xs2</h1>
                </Grid>
            </Grid>
           
        </>
    )
}
