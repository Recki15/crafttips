import React, { useEffect, useState } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import LandingNavBar from '../Components/LandingNavbar';
import LoggedInNavbar from '../Components/LoggedInNavbar';
import "./Background.css";
import { Link } from 'react-router-dom';



export const GeneralPageNotFound = () => {
    const [name, setName] = useState('');
    useEffect(() => {
      refreshToken();
      }, []);
  
      const refreshToken = async () => {
          try {
              const response = await axios.get('http://localhost:5000/token');
              const decoded = jwt_decode(response.data.accessToken);
              setName(decoded.name);
          } catch (error) {
            console.log("Looking for something? Might find it if you register/log in! ;)");
              if (error.response) {
              }
          }
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
    <div style={{display:'block',marginLeft:'auto', marginRight:'auto', marginTop:'20px', marginBottom:'20px' ,width:'30%'}}>
        <img src='https://cdn-icons-png.flaticon.com/512/580/580185.png' alt='notfound'/>
        <h1 style={{color:"#EEEEEE"}}>Oh-oh! Looks like this page might not exist! If you think this is a mistake try to contact us <b><Link to={"/contactus"} style={{color:"#EEEEEE"}}>here</Link></b></h1>
    </div>
    </>
  )
}
