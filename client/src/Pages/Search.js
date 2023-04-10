import React, { useState } from 'react';
import { Form, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useEffect } from 'react'
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
import { Link, useNavigate, useParams } from 'react-router-dom';
import "./Background.css";
import { format, parseISO } from 'date-fns'
import LandingNavbar from '../Components/LandingNavbar';

const SearchPage = () => {
    const { text } = useParams('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterOptions, setFilterOptions] = useState({
      option1: false,
      option2: false,
      option3: false,
    });
    const [searchResults, setSearchResults] = useState([]);
  
    const handleSearchQueryChange = (event) => {
      setSearchQuery(event.target.value);
    };
  
    const handleFilterOptionChange = (event) => {
      const { name, checked } = event.target;
      setFilterOptions((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    };
  
    const handleSearchSubmit = (event) => {
      event.preventDefault();
      // make API call with searchQuery and filterOptions
      // set searchResults state with response
      setSearchResults(mockSearchResults); // for demo purposes only
    };
  
    const mockSearchResults = [
      { id: 1, title: 'Search Result 1', option1: true, option2: false, option3: true },
      { id: 2, title: 'Search Result 2', option1: false, option2: true, option3: true },
      { id: 3, title: 'Search Result 3', option1: true, option2: true, option3: false },
    ];
  
    const filteredResults = searchResults.filter((result) => {
      const { option1, option2, option3 } = filterOptions;
      return (
        (!option1 || result.option1) &&
        (!option2 || result.option2) &&
        (!option3 || result.option3)
      );
    });

  
  const [ispost, setpost] = useState([]);
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);

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

    const viewPost = async(e) =>{
      try {
        axios.get(`http://localhost:5000/activePosts`)
        .then(res => { 
            setpost(res.data);
        })
      } catch (error) { throw error;}
    }

    const getUsers = async () => {
      try {
      axios.get('http://localhost:5000/tokenlessUsers')
      .then(res => {
        setUsers(res.data);
      })
      } catch (error) { throw error;}
    }

    const Profile = (e) =>{
      for (let i = 0; i< users.length; i++) {
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
  
    const navbarDecider = () =>{
      if(name.length > 0) {
        return <LoggedInNavbar/>
      }else{
        return <LandingNavbar />}
    }

    return (
      <div className="container mt-5">
        {navbarDecider()}
        <Form onSubmit={handleSearchSubmit}>
          <FormGroup className="mb-3 d-flex align-items-center">
            <input type="search" class="form-control" id="" defaultValue={text} onChange={(e) => searchInput(e.target.value)} placeholder="Search" required="" />
          </FormGroup>
          <FormGroup className="mb-3 d-flex align-items-center">
            <label>Filter by:</label>
            <FormGroup check className="ms-3">
              <label check>
                <input
                  type="checkbox"
                  name="option1"
                  checked={filterOptions.option1}
                  onChange={handleFilterOptionChange}
                />
                {' '}
                Hammer
              </label>
            </FormGroup>
            <FormGroup check className="ms-3">
              <label check>
                <input
                  type="checkbox"
                  name="option2"
                  checked={filterOptions.option2}
                  onChange={handleFilterOptionChange}
                />
                {' '}
                Nails
              </label>
            </FormGroup>
            <FormGroup check className="ms-3">
              <label check>
                <input
                  type="checkbox"
                  name="option3"
                  checked={filterOptions.option3}
                  onChange={handleFilterOptionChange}
                />
                {' '}
                Ducttape
              </label>
            </FormGroup>
          </FormGroup>
          <hr/>
        </Form>
        <Grid container spacing={1}>
          <Grid item xs={12} className="gridL">
            <div className='decidediv'>
              <Grid container rowSpacing={-5} columnSpacing={{ xs: -1, sm: -2, md: -1 }} >
                {ispost.map((item, index) => (
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
            </div>

          </Grid>
          
        </Grid>
      </div>
    );
  };
  
  export default SearchPage;