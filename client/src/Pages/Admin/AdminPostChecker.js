import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import Grid from '@mui/material/Grid';
import "../Background.css";
import { SideBar } from './SideBar';

export const AdminPostChecker = () => {
    const { ids } = useParams();
    const [ispost, setpost] = useState([]);
    let navigate = useNavigate();
    useEffect(() => {
        refreshToken();
        viewPostById();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            const decoded = jwt_decode(response.data.accessToken);
            if(decoded.permission_level < 1){
                navigate("/");
            }
        } catch (error) {
            if (error.response) {
            }
        }
    }

    const viewPostById = async() =>{
        try {
          await axios.get(`http://localhost:5000/findPostById/${ids}`)
          .then(res => { 
              setpost(res.data);
              console.log(ispost)
          })
        } catch (error) { throw error;}
      }

      const activatePost = (id) => {
        try{
         axios.put(`http://localhost:5000/activatePost/${id}`);
         navigate('../admin/admindecide');
        }catch (error) { throw error;} 
      }

      const deletePost = (id) => {
        axios.delete(`http://localhost:5000/deletePost/${id}`);
        navigate('../admin/admindecide');
      }



    return (
        <>
            <Grid container>
                <Grid item xs={2}>
                <div style={{backgroundColor:'#222831', height:'100%'}}>
                    <SideBar />
                </div>
                </Grid>
                <Grid item xs={8}>
                    <div id='postWrap'>
                        <h1>{ispost.title}</h1>
                        <img src={ispost.cover_image}></img>
                        <div dangerouslySetInnerHTML={{ __html: ispost.long_desc}}  id="post"/>
                    </div>
                </Grid>
                <Grid item xs={2}>
                <h1 style={{color:'aqua', border: '1px solid green'}}>Decide what to do with the post! Should it be deleted or published?</h1>
                <br />
                <div>
                    <button onClick={() => activatePost(Number(ids))}>Activate Post</button>
                    <button onClick={() => deletePost(Number(ids))}>Delete Post</button>
                </div>
                </Grid>
            </Grid>
           
        </>
    )
}
