import React, { useEffect, useState } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { Avatar, CardActionArea, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import "./Background.css";
import { GiCrafting } from "react-icons/gi";
import { MdRecycling} from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { BiHomeAlt } from "react-icons/bi";
import { CgFeed } from "react-icons/cg";


export const WelcomeLoggedIn = () => {
    const [name, setName] = useState('');

    useEffect(() => {
        refreshToken();
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

  return (
    <>
        <div className='welcomehead'>
            <br/>
            <br/>
            <br/>
              <h2 className='welcomeh2'>WELCOME BACK,</h2>
              <h1 className='welcomeh1'>{name}!</h1>
              <p className='welcomep'></p>
          </div>
          <div className='ttddiv'>
          <p className='welcomep2'>Start crafting today!</p>
          <Grid container className='welcomegrid'>
            <Grid item xs={2} >
              
            </Grid>
            <Grid item xs={8}>
              <Grid container  className='welcomegrid2' spacing={3}>
                <Grid item xs={2} sm={2} className='welcomegrid3'>
                  <GiCrafting className='weicon'/>
                  <p>Cure your boredom and craft something!</p>
                </Grid>
                <Grid item xs={2} sm={2} className='welcomegrid3'>
                  <AiOutlineSearch className='weicon'/>
                  <p>Search and find amazing tips!</p>
                </Grid>
                <Grid item xs={2} sm={2} className='welcomegrid3'>
                  <MdRecycling className='weicon'/>
                  <p>Recycle your trash and save our world!</p>
                </Grid>
                <Grid item xs={2} sm={2} className='welcomegrid3'>
                  <BiHomeAlt className='weicon'/>
                  <p>Decorate your home by hand-made decor</p>
                </Grid>
                <Grid item xs={2} sm={2} className='welcomegrid3'>
                  <CgFeed className='weicon'/>
                  <p>Reach the feed of the communtity</p>
                </Grid>
                <Grid item xs={2}className='welcomegrid3'>
                  
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2}>
            </Grid>
          </Grid>
          </div>
    </>
  )
}