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


export const Home = () => {
  const [name, setName] = useState('');
  const [ispost, setpost] = useState([]);
  
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
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {ispost.map((item,index) => ( 
            <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
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
              </CardContent>
            </CardActionArea>
          </Card>
        ))} 
        </Grid>
        
    </>
  )
}
