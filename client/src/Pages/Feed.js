import React, { useEffect, useState } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import LandingNavBar from '../Components/LandingNavbar';
import {Welcome} from './Welcome';
import LoggedInNavbar from '../Components/LoggedInNavbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { AppBar, Avatar, ButtonGroup, CardActionArea, FormControlLabel, FormGroup, Grid, IconButton, Menu } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import "./Background.css";
import { format, parseISO } from 'date-fns'
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { GiCrafting } from "react-icons/gi";
import { MdRecycling} from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { BiHomeAlt } from "react-icons/bi";
import { CgFeed } from "react-icons/cg";



export const Feed = () => {

    const [name, setName] = useState('');
    const [creatorID, setCreatorID] = useState('');
    const [userID, setUserID] = useState('');
    const [ispost, setpost] = useState([]);
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      refreshToken();
      viewPost();
      getUsers();
      }, []);
  
      const refreshToken = async () => {
          try {
              const response = await axios.get('http://localhost:5000/token');
              const decoded = jwt_decode(response.data.accessToken);
              setName(decoded.name);
              setCreatorID(decoded.creator_id);
          } catch (error) {
              if (error.response) {
              }
          }
        }
        const axiosJWT = axios.create();
  
        axiosJWT.interceptors.request.use(async (config) => {
            const currentDate = new Date();
            if (expire * 1000 < currentDate.getTime()) {
                const response = await axios.get('http://localhost:5000/token');
                config.headers.Authorization = `Bearer ${response.data.accessToken}`;
                setToken(response.data.accessToken);
                const decoded = jwt_decode(response.data.accessToken);
                setName(decoded.name);
                setExpire(decoded.exp);
                setUserID(decoded.id);
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        });
  
        const getUsers = async () => {
          const response = await axiosJWT.get('http://localhost:5000/users', {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          });
          setUsers(response.data);
      }
  
  
        const viewPost = async() =>{
          try {
            axios.get(`http://localhost:5000/activePosts`)
            .then(res => { 
                setpost(res.data);
            })
          } catch (error) { throw error;}
        }
  
  
        const navbarDecider = () =>{
          if(name.length > 0) {
            return <LoggedInNavbar/>
          }else{
            return <LandingNavBar />}
        }
  
        const welcomeDecider = () =>{
          if(name.length > 0) {
            return 
          }else{
            return <Welcome/>}
        }
  
        const Profile = (e) =>{
          for (let i = 0; i< users.length; i++) {
            if (users[i].id === e) {
              let name = users[i].name;
              return (
                <Grid container>
                  <Grid item xs={1}>
                    <Avatar sx={{ bgcolor: "#222831", color: "#00ADB5", margin: "5px" }}>{(name.substring(0, 2)).toUpperCase()}</Avatar>
                  </Grid>
                  <Grid item xs={1} marginTop={"10px"} marginLeft={"5px"} textAlign={"center"}>
                    {name}
                  </Grid>
                </Grid>
                )
            }
          }
        }
return(
    <>
   
        <Grid container spacing={3}>
                <div className='decidediv'>
                    <Grid container rowSpacing={-5} columnSpacing={{ xs: -1, sm: -2, md: -1 }} sx={{marginTop:"30px"}} >
                        {ispost.map((item, index) => (
                            <Card sx={{ width: 400, marginBottom:"20px", backgroundColor: "#393E46", borderRadius: "15px", color: "#EEE" }} key={index}>
                                <CardActionArea component={Link} to={'/profile/' + item.creator_id}>
                                    {Profile(item.creator_id)}
                                </CardActionArea>
                                <CardActionArea component={Link} to={'posts/' + item.id}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={item.cover_image}
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" color="#EEE">
                                            {item.title}

                                        </Typography>
                                        <Typography variant="body2" color="#EEE">
                                            {item.short_desc}
                                        </Typography>
                                        <Typography gutterBottom variant="h9" component="div">
                                            <br />
                                            <p style={{ borderTop: '1px solid black', color: '#00ADB5' }}>Updated at: {format(parseISO(item.updatedAt), "yyyy-MM-dd")}</p>
                                            <p style={{ color: '#00ADB5' }}>Tools needed: {item.tools}</p>
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>

                        ))}
                    </Grid>
                </div>
            </Grid>
            
      
    </>
)    
}