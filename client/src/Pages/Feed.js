import React, { useState } from 'react';
import { useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import LandingNavBar from '../Components/LandingNavbar';
import LoggedInNavbar from '../Components/LoggedInNavbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Avatar, CardActionArea, Grid, } from '@mui/material';
import { Link } from 'react-router-dom';
import "./Background.css";
import { format, parseISO } from 'date-fns'
import LandingNavbar from '../Components/LandingNavbar';
import Pagination from '../Components/Pagination';

export const Feed = () => {
  const [ispost, setpost] = useState([]);
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(10)


  useEffect(() => {
    refreshToken();
    viewPost()
    getUsers()
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


  const viewPost = async (e) => {
    try {
      axios.get(`http://localhost:5000/activePosts`)
        .then(res => {
          setpost(res.data);
        })
    } catch (error) { throw error; }
  }

  const getUsers = async () => {
    try {
      axios.get('http://localhost:5000/tokenlessUsers')
        .then(res => {
          setUsers(res.data);
        })
    } catch (error) { throw error; }
  }

  const Profile = (e) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === e) {
        let name = users[i].name;
        return (
          <Grid container>
            <Grid item xs={2}>
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

  const navbarDecider = () => {
    if (name.length > 0) {
      return <LoggedInNavbar />
    } else {
      return <LandingNavbar />
    }
  }


  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = ispost.slice(firstPostIndex, lastPostIndex)

  return (
    <div className='content'>
      {navbarDecider()}
      <Grid container spacing={1}>
        <Grid item xs={1} />
        <Grid item xs={10} className="gridL">
          <div className='decidediv'>
            <Grid container rowSpacing={-5} columnSpacing={{ xs: -1, sm: -2, md: -1 }} >
              {currentPosts.map((item, index) => (
                <Card sx={{ maxWidth: 250, margin: "10px", backgroundColor: "#393E46", border: "2px solid #00ADB5", borderRadius: "15px", color: "#EEE" }} key={index} id={item.id}>
                  <CardActionArea component={Link} to={'/profile/' + item.creator_id}>
                    {Profile(item.creator_id)}
                  </CardActionArea>
                  <CardActionArea component={Link} to={'/posts/' + item.id}>
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
            <Pagination
              totalPosts={ispost.length}
              postsPerPage={postsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>

        </Grid>
        <Grid item xs={1} />
      </Grid>
    </div>
  );
};