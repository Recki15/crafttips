import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import Grid from '@mui/material/Grid';
import "./Background.css";
import LoggedInNavbar from '../Components/LoggedInNavbar';
import LandingNavbar from '../Components/LandingNavbar';
import { Button } from 'react-bootstrap';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';



const labels = {
  1: 'Useless',
  2: 'Poor',
  3: 'Ok',
  4: 'Good',
  5: 'Excellent',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}



export const Posts = () => {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [avgRating, SetAvgRating] = useState('');
  const [alreadyRated, setAlreadyRated] = useState(false);
  const { ids } = useParams();
  const [ispost, setpost] = useState([]);
  const [value, setRatingValue] = React.useState(3);
  const [hover, setHover] = React.useState(-1);
  let navigate = useNavigate();
  useEffect(() => {
    refreshToken();
    viewPostById();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:5000/token');
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setUserId(decoded.userId);
      getRatings(decoded.userId);
    } catch (error) {
      if (error.response) {
      }
    }
  }

  const viewPostById = async () => {
    try {
      await axios.get(`http://localhost:5000/findPostById/${ids}`)
        .then(res => {
          setpost(res.data);
          if (res.data.active === 0) {
            window.alert("No permission!")
            navigate('/');
          }
        })
    } catch (error) { throw error; }
  }

  const getRatings = async (e) => {
    try {
      await axios.get(`http://localhost:5000/getRatings/${ids}`)
        .then(res => {
          let avg = 0;
            for (let i = 0; i < res.data.length; i++) {
              if (e === res.data[i].userId) {
                setAlreadyRated(true)
                setRatingValue(res.data[i].rating)
              }
            avg = avg + res.data[i].rating;
            }
            if (res.data.length === 0) {
              SetAvgRating("--not yet rated--");
            } else{SetAvgRating(avg/res.data.length + " /5");}
            
          }
          )
    } catch (error) { throw error; }
  }

  const navbarDecider = () => {
    if (name.length > 0) {
      return <LoggedInNavbar />
    } else {
      return <LandingNavbar />
    }
  }

  const ratingDecider = () => {
    if (name.length > 0) {
        if (alreadyRated) {
          return <>
          <h1 style={{ color: '#EEE' }}>Current rating: {avgRating}</h1>
            <h3 style={{ color: '#EEE' }}>Do you want to change your rating?</h3>
            <Box
              sx={{
                width: 200,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Rating
                name="hover-feedback"
                value={value}
                precision={1}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                  setRatingValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
              />
              {value !== null && (
                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
              )}
            </Box>
            <Button type='submit' id='updateRating' onClick={updateRating}>Update rating</Button>
          </>

        }
      return <>
      <h1 style={{ color: '#EEE' }}>Current rating: {avgRating}</h1>
        <h3 style={{ color: '#EEE' }}>How usefull was this CraftTip for you?</h3>
        <Box
          sx={{
            width: 200,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Rating
            name="hover-feedback"
            value={value}
            precision={1}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              setRatingValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          />
          {value !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
          )}
        </Box>
        <Button type='submit' onClick={addRating} id='addRating'>Submit rating</Button>
      </>
    } else {
      return (
      <>
      <h1 style={{ color: '#EEE' }}>Current rating: {avgRating}</h1>
      <h2 style={{ color: '#EEE' }}>You should register to rate this CraftTip! ;)</h2>
      </>  )
    }
  }

  const addRating = async () => {
    try {
      await axios.post('http://localhost:5000/addRating', {
        postId: ids,
        userId: userId,
        rating: value
      })
      document.getElementById('addRating').style.height = 0
      document.getElementById('addRating').style.width = 0
      document.getElementById('addRating').hidden = true
      document.getElementById('addRating').disabled = true
      window.alert('Thank you for rating this post! If you ever wanna update your rating just refresh the page or come back here another time+ :=)')
    } catch (error) { throw error; }
  }

  const updateRating = async () => {
    try {
      await axios.put(`http://localhost:5000/updateRating/${ids}/${userId}/${value}`)
      document.getElementById('updateRating').style.height = 0
      document.getElementById('updateRating').style.width = 0
      document.getElementById('updateRating').hidden = true
      document.getElementById('updateRating').disabled = true
      window.alert("Your rating was successfully updated!")
    } catch (error) { throw error; }
  }



  return (
    <>
      {navbarDecider()}
      <Grid container>
        <Grid item xs={2}>
          
        </Grid>
        <Grid item xs={8}>
          <div id='postWrap'>
            <div className='postImgdiv'>
              <img src={ispost.cover_image} className='postImg' alt={ispost.title}></img>
            </div>
            <div className='postTitle'>
              <h1>{ispost.title}</h1>
            </div>
            <h2 className='posth2'>About this item</h2>
            <div className='postLongdesc'>
              <div dangerouslySetInnerHTML={{ __html: ispost.long_desc }} id="post" />
            </div>
            {ratingDecider()}
          </div>

          
        </Grid>
        <Grid item xs={2}>
          
        </Grid>
      </Grid>
    </>
  )
}
