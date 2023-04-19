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
import { CgEnter, CgFeed } from "react-icons/cg";
import { AiOutlineStar } from "react-icons/ai";

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
        <div className='welcome'>
              <h2 className='welcometext'>WELCOME BACK,</h2>
              <h1 className='welcometext'>{name.toUpperCase()}!</h1>
          <Grid container className='welcomegrid'>
            <Grid item xs={2} >
              
            </Grid>
            <Grid item xs={8} alignContent={'center'}>
              <Grid container  className='welcomegrid2' spacing={8} alignContent={'center'}>
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
                  <p>Decorate your home by hand-made decor!</p>
                </Grid>
                <Grid item xs={2} sm={2} className='welcomegrid3'>
                  <CgFeed className='weicon'/>
                  <p>New posts uploaded every day!</p>
                </Grid>
                <Grid item xs={2} sm={2} className='welcomegrid3'>
                  <AiOutlineStar className='weicon'/>
                  <p>Tell everyone your opinin on crafts!</p>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2} >
              
            </Grid>
          </Grid>
          </div>
    </>
  )
}