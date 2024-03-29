import React, { useEffect, useState } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import "../Background.css";
import { SideBar } from './SideBar';

export const AdminDecide = () => {

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
      if (decoded.permission_level < 1) {
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
      }
    }
  }


  const viewPost = async () => {
    try {
      axios.get(`http://localhost:5000/inactivePosts`)
        .then(res => {
          setpost(res.data);
        })
    } catch (error) { throw error; }
  }


  const activatePost = (id) => {
    try {
      axios.put(`http://localhost:5000/activatePost/${id}`);
      document.getElementById(id).setAttribute("hidden", "hidden");
    } catch (error) { throw error; }
  }

  const deletePost = (id) => {
    axios.delete(`http://localhost:5000/deletePost/${id}`);
    document.getElementById(id).setAttribute("hidden", "hidden");
  }

  function doActivateAction(action, message, id) {
    if (window.confirm(message)) {
      console.log(action + ' is confirmed');
      activatePost(id)

    } else {
      //If user say 'no' and cancelled the action
      console.log(action + ' is cancelled');
    }
  };

  function doDeleteAction(action, message, id) {
    if (window.confirm(message)) {
      console.log(action + ' is confirmed');
      deletePost(id)

    } else {
      //If user say 'no' and cancelled the action
      console.log(action + ' is cancelled');
    }
  };

  return (
    <>
      <div className='content'>
        <Grid container spacing={1}>
          <Grid item xs={2} className="gridR">
            <div className='sidebardiv'>
              <SideBar />
            </div>
          </Grid>
          <Grid item xs={10} className="gridL">
            <div className='decidediv'>
              <div className=''>
                <Grid container rowSpacing={-5} columnSpacing={{ xs: -1, sm: -2, md: -1 }}>
                  {ispost.map((item, index) => (
                    <Card sx={{ maxWidth: 345, margin: "10px" }} key={index} id={item.id}>
                      <CardActionArea component={Link} to={'posts/' + item.id}>
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
                      <button onClick={() => doActivateAction("Activate post", "Are you sure about activating this post?", item.id)} className="btn btn-success">Make post visible</button>
                      <button onClick={() => doDeleteAction("Deleting post", "Are you sure you want to delete this post?", item.id)} className="btn btn-danger">Delete post</button>
                    </Card>
                  ))}
                </Grid>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  )
}