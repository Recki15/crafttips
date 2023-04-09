import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import './Background.css';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { format, parseISO } from 'date-fns';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

export default function ProfileEditor() {
  const [name, setName] = useState('');
  const [ispost, setpost] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    refreshToken();
    }, []);
  
    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            const decoded = jwt_decode(response.data.accessToken);
            viewPost(decoded.userId);
            setName(decoded.name);
        } catch (error) {
            if (error.response) {
            }
        }
      }
  
      const viewPost = async(e) =>{
        try {
          axios.get(`http://localhost:5000/findPostsByUserId/${e}`)
          .then(res => { 
              setpost(res.data);
          })
        } catch (error) { throw error;}
      }

      const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      }));
      
      const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));
      
      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
              width: '20ch',
            },
          },
        },
      }));


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
  return (
    <div className="gradient-custom-3">
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: 'black', height: '200px' }}>
                <div style={{width: "50px", float: "right"}}>
              <Link to="/ProfileManage"><button className='editbutton'>Back</button></Link>
              </div>
                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <MDBTypography tag="h5">Hey, <b>{name}</b> changing your name/password is disabled at the moment. If you need anything please contact our support team via the <Link to={'/contactus'}>contact page</Link></MDBTypography>
                  
                </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                
              </div>
              <MDBCardBody className="text-black p-4">
               
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <MDBCardText className="lead fw-normal mb-0">Recent posts</MDBCardText>
                </div>
                <MDBRow>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e) => searchInput(e.target.value)}
                  />
                </Search>
                <Grid container rowSpacing={-5} columnSpacing={{ xs: -1, sm: -2, md: -1 }}>
                  {ispost.map((item,index) => ( 
                  <Card sx={{ maxWidth: 285, margin: "10px"}} key={index} id={item.id}>
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
                <Button LinkComponent={Link} to={`/editpost/${item.id}`}>Edit post</Button>
            </Card>
          ))} 
          </Grid>
                </MDBRow>
              </MDBCardBody>
              
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}