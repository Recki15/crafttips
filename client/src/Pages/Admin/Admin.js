import React, { useEffect, useState } from 'react'
import "../Background.css";
import {SideBar} from "./SideBar";
import  {AdminDecide}  from './AdminDecide';
import { Avatar, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import FormGroup from '@mui/material/FormGroup/FormGroup';

export const Admin = () => {

const [name, setName] = useState('');
const [ispost, setpost] = useState([]);
const navigate = useNavigate();
const [users, setUsers] = useState([]);
const [token, setToken] = useState('');
const [expire, setExpire] = useState('');
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
          if(decoded.permission_level < 1){
            navigate("/");
        }
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

    const Profile = (e) =>{
      for (let i = 0; i< users.length; i++) {
        if (users[i].id === e) {
          let name = users[i].name;
          return (
            <Grid container>
              <Grid item xs={3}>
                <Avatar sx={{ bgcolor: "#222831", color: "#00ADB5", margin: "5px" }}>{(name.substring(0, 2)).toUpperCase()}</Avatar>
              </Grid>
              <Grid item xs={3} marginTop={"10px"} marginLeft={"5px"} textAlign={"center"}>
                {name}
              </Grid>
            </Grid>
            )
        }
      }
    }
    const deletePost = (id) => {
      axios.delete(`http://localhost:5000/deletePost/${id}`);
      document.getElementById(id).setAttribute("hidden", "hidden");
    }

    const deactivate = (id) => {
      try {
        axios.put(`http://localhost:5000/deactivatePost/${id}`);
        document.getElementById(id).setAttribute("hidden", "hidden");
      } catch (error) { throw error; }
    }


    function doDeleteAction(action, message, id) {
      if (window.confirm(message)) {
        console.log(action + ' is confirmed');
        deletePost(id)
  
      } else {
        //If user say 'no' and cancelled the action
        console.log(action + ' is cancelled');
      }
    };

    function doDeactivation(action, message, id) {
      if (window.confirm(message)) {
        console.log(action + ' is confirmed');
        deactivate(id)
  
      } else {
        //If user say 'no' and cancelled the action
        console.log(action + ' is cancelled');
      }
    };

    const searchInput = (e) => {
      for (let index = 0; index < ispost.length; index++) {
        if (ispost[index].title.replace(/\s+/g, '').toLowerCase().includes(e.replace(/\s+/g, '').toLowerCase())) {
          document.getElementById(ispost[index].id).style.height="auto"
          document.getElementById(ispost[index].id).style.width="auto"
        } else {
          document.getElementById(ispost[index].id).style.height="0"
          document.getElementById(ispost[index].id).style.width="0"
        }
      }
    }


return(
      <div className='content'>
        <div className='gradient-custom-3'>
        <Grid container spacing={1}>
        <Grid item xs={2} className="gridR">
        <div className='sidebardiv'>
        <SideBar />
        </div>
        </Grid>
        <Grid item xs={10} className="gridL">
        <div className='decidediv'>
        <h1 style={{color:'#EEE'}}>Currently active posts </h1><br />
        <FormGroup className="mb-3 d-flex align-items-center">
            <input type="search" className="form-control" id="" onChange={(e) => searchInput(e.target.value)} placeholder="Search" required="" />
        </FormGroup>
        <Grid container rowSpacing={-5} columnSpacing={{ xs: -1, sm: -2, md: -1 }}>
          {ispost.map((item,index) => ( 
           <Card sx={{ maxWidth: 250, margin: "10px"}} key={index} id={item.id}>
           <CardActionArea component={Link} to={'/profile/'+item.creator_id}>
             <CardContent>
             {Profile(item.creator_id)}
            </CardContent>
             </CardActionArea>
           <CardActionArea component={Link} to={'/posts/'+item.id}>
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
           <button onClick={() => navigate(`/editpost/${item.id}`)} className="btn btn-warning">Edit post</button>
           <button onClick={() => doDeactivation("Deactivating post", "Are you sure you want to deactivate this post?", item.id)} className="btn btn-warning">Deactivate post</button>
           <button onClick={() => doDeleteAction("Deleting post", "Are you sure you want to delete this post FOREVER?", item.id)} className="btn btn-danger">Delete post</button>
         </Card>
          ))} 
          </Grid>
        </div>
        </Grid>
        </Grid>
      </div>
      </div>
    )
}