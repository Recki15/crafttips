import * as React from 'react';
import "./SideBar.css";
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';





export const SideBar = () =>{

    const menu = [{name:"Admin Decide", url:"/admindecide"},{name:"Dasboard", url:"/admindecide"}];

return(
<>


   <div className='div1'>
    <div className='div2'>
    <Box sx={{ flexGrow: 1, display: 'inline' }}>
          {menu.map((page, index) => (
            <Button
              key={index}
              LinkComponent={Link} to={page.url}
              sx={{ my: 2, color: '#00ADB5', display: 'block' ,":hover": {color: "white"}}}
            >
              {page.name}
            </Button>
          ))}
        </Box>
    </div>
   </div>

    
</>
)
}
