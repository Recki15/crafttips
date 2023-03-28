import React, { useEffect, useState } from 'react'
import "../Background.css";
import {SideBar} from "./SideBar";
import  {AdminDecide}  from './AdminDecide';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import axios from 'axios';
import jwt_decode from "jwt-decode";

export const Admin = () => {

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
          if(decoded.permission_level !== 1){
            navigate("/");
        }
      } catch (error) {
          if (error.response) {
          }
      }
    }

    const viewPost = async() =>{
      try {
        axios.get(`http://localhost:5000/activePosts`)
        .then(res => { 
            setpost(res.data);
        })
      } catch (error) { throw error;}
    }

  
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
        <Grid container rowSpacing={-5} columnSpacing={{ xs: -1, sm: -2, md: -1 }}>
          {ispost.map((item,index) => ( 
            <Card sx={{ maxWidth: 345, margin: "10px"}} key={index}>
              <CardActionArea component={Link} to={'admindecide/posts/'+item.id}>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.cover_image}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.short_desc}
                  </Typography>
                  <Typography gutterBottom variant="h9" component="div">
                  <br />
                  <p style={{borderTop:'1px solid black', color:'red'}}>Updated at: {format(parseISO(item.updatedAt),"yyyy-MM-dd")}</p> 
                  <p style={{color:'red'}}>Tools needed: {item.tools}</p>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))} 
          </Grid>
        </div>
        </Grid>
        </Grid>
      </div>
    )
}