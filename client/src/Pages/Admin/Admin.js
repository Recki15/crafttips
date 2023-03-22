import React, { useState } from 'react'
import "../Background.css";
import {SideBar} from "./SideBar";
import  {AdminDecide}  from './AdminDecide';
import LandingNavBar from '../../Components/LandingNavbar';
import LoggedInNavbar from '../../Components/LoggedInNavbar';
import { Grid } from '@mui/material';

export const Admin = () => {

const [name, setName] = useState('');


const navbarDecider = () =>{
    if(name.length > 0) {
      return <LoggedInNavbar />
    }else{
      return <LandingNavBar />}
  }



  
return(
        <>
        {navbarDecider()}
        <div className='gradient-custom-3'>
        <Grid container spacing={1}>
        <Grid item xs={2} className="gridR">
        <div className='sidebardiv'>
        <SideBar />
        </div>
        </Grid>
        <Grid item xs={10} className="gridL">
        <div className='decidediv'>
        
        </div>
        </Grid>
        </Grid>
        </div>
    </>
    )
}