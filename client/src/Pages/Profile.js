import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import './ProfileManageStyle.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { format, parseISO } from 'date-fns';
import axios from 'axios';
import jwt_decode from "jwt-decode";

export default function Profile() {

  const ids = useParams();
  const [isAdmin, setIsAdmin] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [ispost, setpost] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    refreshToken();
    }, []);
  
    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            const decoded = jwt_decode(response.data.accessToken);
            viewPost(Number(ids.ids));
            setIsAdmin(decoded.permission_level);
        } catch (error) {
            if (error.response) {
            }
        }
      }
  
      const viewPost = async(e) =>{
        try {
          axios.get(`http://localhost:5000/findPostByUserId/${e}`)
          .then(res => { 
              setpost(res.data);
          })
        } catch (error) { throw error;}
        getUser(e);
      }

      const getUser = (e) => {
        try{
          axios.get(`http://localhost:5000/getuser/${e}`)
          .then(res => {
            setName(res.data.name);
            setEmail(res.data.email);
            setRole(res.data.permission_level);
          })
        }catch(error) {throw error}
      }
  
      const titleDecider = () => {
        let postNum = ispost.length;
        if (postNum>10) {return "Professional";}
        if (postNum>5) {return "Intermediate";}
        if (postNum>1) {return "Beginner";}
        if (postNum<1) {return "Guest";}
      }

      const roleDecider = (e) => {
        if(e === 0){return "User"}
        if(e === 1){return "Admin"}
        if(e === 2){return "Super Admin"}
      }

  return (
    <div className="gradient-custom-3">
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  <MDBCardImage src={`https://ui-avatars.com/api/?name=${name}`}
                    alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />

                </div>
                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <MDBTypography tag="h5">{name}</MDBTypography>
                  <MDBCardText>{titleDecider()}</MDBCardText>
                </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                <div>
                  <div style={{width: "50px", float: "right"}}>
                    <MDBCardText className="mb-1 h5">{ispost.length}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Posts</MDBCardText>
                  </div>
                </div>
              </div>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1 mainTexts">Basic Information</p>
                  <div className="p-4" style={{ backgroundColor: '#EEEEEE' }}>
                    <MDBCardText className="font-italic mb-1 MDBText">Username: <label className='otherTexts'>{name}</label></MDBCardText>
                    <MDBCardText className="font-italic mb-1 MDBText">Email address: <label className='otherTexts'>{email}</label> </MDBCardText>
                    <MDBCardText className="font-italic mb-0 MDBText">Role: <label className='otherTexts'>{roleDecider(role)}</label></MDBCardText>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <MDBCardText className="lead fw-normal mb-0 mainTexts">Recent posts</MDBCardText>
                  <MDBCardText className="mb-0"><a href="#!" className="text-muted">Show all</a></MDBCardText>
                </div>
                <MDBRow>
                  <MDBCol className="mb-2">
                  <Grid container rowSpacing={-5} columnSpacing={{ xs: -1, sm: -2, md: -1 }}>
                  {ispost.map((item,index) => ( 
                  <Card sx={{ maxWidth: 285, margin: "10px"}} key={index}>
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
            </Card>
          ))} 
          </Grid>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}