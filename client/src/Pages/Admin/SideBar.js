import * as React from 'react';
import "./SideBar.css";
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {SideBarData} from "./SideBarData";





export const SideBar = () =>{

    

return(
<>
    <div className='sideBar'>
      <ul className='sideBarList'>
        {SideBarData.map((value, key) => {
          return <Link 
          id={window.location.pathname == value.link ? "active" : ""}
          key={key}
          className= "row"
          to={value.link}>
              <div>{value.title}</div>
          </Link>
        })}
      </ul>
    </div>

    
</>
)
}
