import React, { useState } from 'react'
import "../Background.css";
import {SideBar} from "./SideBar";
import  {AdminDecide}  from './AdminDecide';
import { Grid } from '@mui/material';

export const Admin = () => {

const [name, setName] = useState('');
  
return(
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
    )
}