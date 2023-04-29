import React, { useState } from 'react';
import { useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import LoggedInNavbar from '../Components/LoggedInNavbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Avatar, CardActionArea, Grid } from '@mui/material';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import "./Background.css";
import { format, parseISO } from 'date-fns'
import LandingNavbar from '../Components/LandingNavbar';
import { ToolsAndMaterialsData } from '../ToolsAndMaterialsData';

const SearchPage = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedTools, setSelectedTools] = useState('');

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


  const searchInput = () => {
    const searchReq = selectedTools.slice(0, -1).replace(/\s+/g, '').toLowerCase().split(";");
    for (let index = 0; index < ispost.length; index++) {

      if (ispost[index].title.replace(/\s+/g, '').toLowerCase().includes(searchText.replace(/\s+/g, '').toLowerCase())) {
        if (selectedTools.length > 0) {
          if (searchReq.every(i => ispost[index].tools.replace(/\s+/g, '').toLowerCase().includes(i))) {
            document.getElementById(ispost[index].id).style.display = "initial"
          } else {
            document.getElementById(ispost[index].id).style.display = 'none'
          }
        } else {
          document.getElementById(ispost[index].id).style.display = "initial"
        }
      } else {
        document.getElementById(ispost[index].id).style.display = 'none'
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

  var handleChange = (selectedOption) => {
    let szoveg = "";
    selectedOption.forEach(e => {
      szoveg = szoveg + e.value + ";"
    });
    setSelectedTools(szoveg);

  };

  const navbarDecider = () => {
    if (name.length > 0) {
      return <LoggedInNavbar />
    } else {
      return <LandingNavbar />
    }
  }



  const customStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      color: state.isSelected ? "#222831" : "#00ADB5",
      backgroundColor: state.isSelected ? "#00ADB5" : "#222831",
    }),

    control: (defaultStyles) => ({
      ...defaultStyles,
      backgroundColor: "#222831",
      padding: "10px",
      border: "none",
      boxShadow: "none",
      width: "80%"
    }),
    singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#222831" }),
  };



  return (
    <div className='content'>
      {navbarDecider()}
      <div className='h-100 d-flex align-items-center justify-content-center'>
        <br />
        <input type="search" className="form-control" id="" value={searchText} onChange={(e) => setSearchText(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') searchInput() }} placeholder="Search" required="" style={{ width: '70%'}} />
      </div>
      <br />
      <div className='h-100 d-flex align-items-center justify-content-center'>
        <label>Filter by:</label>
      </div>

          <div className="center">
            <Select
              isMulti
              options={ToolsAndMaterialsData}
              placeholder="Select the tools needed!"
              onChange={handleChange}
              isSearchable={true}
              styles={customStyles}
            />

      </div>
      <div className='h-100 d-flex align-items-center justify-content-center'>
        <button className='search-btn' onClick={searchInput}>Search</button>
      </div>

      <hr />
      <Grid container spacing={1}>
        <Grid item xs={12} className="gridL">
          <div className='decidediv'>
            <Grid container rowSpacing={-5} columnSpacing={{ xs: -1, sm: -2, md: -1 }} >
              {ispost.map((item, index) => (
                <Card sx={{ maxWidth: 250, margin: "10px", backgroundColor: "#393E46", border: "2px solid #00ADB5", borderRadius: "15px", color: "#EEE" }} key={index} id={item.id} style={{ display: 'none' }}>
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