import React from 'react'
import {useState,useEffect} from 'react';
import {Link } from "react-router-dom";
import axios from 'axios';
import Grid from '@mui/material/Grid';

export const Home = () => {
    useEffect(() => {
        viewPost();
    }, []);
  
    const [ispost, setpost] = useState([]);
    const viewPost = async() =>{
      try {
        axios.get(`http://localhost:3001/allPost`)
        .then(res => { 
            setpost(res.data);
        })
      } catch (error) { throw error;}
    }
   
    return (
    <div className="App">
      <div className="container">
        <div className="row">
          <h1 className="App__tittle"> React <span> Quill </span> powerful rich text editor </h1>
          <Link to="/Add" className="btn btn__theme btn__add"> Create Now </Link>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {ispost.map((item,index) => ( 
            <Grid xs={6} key={index} spacing={3}>
              <div className='post_list'>
              <h2>{item.title}</h2>
  
              <div className="post__description" dangerouslySetInnerHTML={{ __html: item.description}}  />
              <div className="post__description" dangerouslySetInnerHTML={{ __html: item.information}}  />
              <Link to={`/Edit/${item.id}`} className="btn btn__theme"> Edit </Link>
              </div>
              </Grid>
          ))}
          </Grid>
          
          
        </div>
      </div>
    </div>
    );
}
