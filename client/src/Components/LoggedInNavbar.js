import React, { useEffect, useState } from 'react'
import './HomeNavbar.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function LoggedInNavbar() {

  const [isHovering, setIsHovering] = useState(false);
  const [isHovering2, setIsHovering2] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleMouseEnter2 = () => {
    setIsHovering2(true);
  };

  const handleMouseLeave2 = () => {
    setIsHovering2(false);
  };

  /*const pages = [<Link to='/add' style={{color: isHovering ? 'white' : '#00ADB5'}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Add</Link>, 'Contact us',
   <Link to='/admindecide' style={{color: isHovering2 ? 'white' : '#00ADB5'}} onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseLeave2}>Admin Decide</Link>];
  const settings = ['Profile', <Link to='/ProfileManage'>Account</Link>, 'Dashboard', <Link to='/logout'>Log out</Link>];*/

  const menu = [{name:"Add", url:"/add"},
  {name:"Admin", url:"/admin"}];

  const settings = [{name:"Profile", url:"/ProfileManage"},{name:"Logout", url:"/logout"}];
  
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
  
    let navigate = useNavigate();

    const Logout = async () => {
        try {
            await axios.delete('http://localhost:5000/logout');
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <AppBar position="static" style={{background:'#222831'}}>
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: '#00ADB5',
            textDecoration: 'none',
            ":hover": {color: "white"}
          }}
        >
          CRAFTTIPS
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none'} }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
            
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
              color: 'red',
              
            }}
          >
            {menu.map((page, index) => (
              <MenuItem key={index} onClick={handleCloseNavMenu} LinkComponent={Link} to={page.url} >
                <Typography textAlign="center">{page.name}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
       
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {menu.map((page, index) => (
            <Button
              key={index}
              onClick={handleCloseNavMenu}
              LinkComponent={Link} to={page.url}
              sx={{ my: 2, color: '#00ADB5', display: 'block' ,":hover": {color: "white"}}}
            >
              {page.name}
            </Button>
          ))}
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            
          >
            {settings.map((setting, index) => (
              <Link key={index} to={setting.url}>
              <MenuItem  onClick={handleCloseUserMenu}>
              <Typography textAlign="center">{setting.name}</Typography>
              
              </MenuItem>
              </Link>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
);
}

export default LoggedInNavbar;