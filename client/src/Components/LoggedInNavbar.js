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
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Stack } from '@mui/material';
import jwt_decode from "jwt-decode";




function LoggedInNavbar() {


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

  /*const pages = [<Link to='/add' style={{color: isHovering ? 'white' : '#00ADB5'}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Add</Link>, 'Contact us',
   <Link to='/admindecide' style={{color: isHovering2 ? 'white' : '#00ADB5'}} onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseLeave2}>Admin Decide</Link>];
  const settings = ['Profile', <Link to='/ProfileManage'>Account</Link>, 'Dashboard', <Link to='/logout'>Log out</Link>];*/

  const menu = [
    {name:"Home", url:"/"},
    {name:"Add", url:"/add"},
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
          console.log("Looking for something? Might find it if you register/log in! ;)");
        }
    }


    

    const [accname, setAccName]= useState('');
    const [randomColor, setrandomColor] = useState();
    {/*const colors = ["red","blue","green"];*/}

    useEffect(() => {
      refreshToken();
      {/*setrandomColor(colors[Math.floor(Math.random() * colors.length)]);*/}
      }, []);
      
    const refreshToken = async () => {
      try {
          const response = await axios.get('http://localhost:5000/token');
          const decoded = jwt_decode(response.data.accessToken);
          setAccName(decoded.name);
      } catch (error) {
          if (error.response) {
          }
      }
    }
    

  return (
    <AppBar position="static" style={{background:'#222831', boxShadow:"none"}}>
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        
        <Typography
          variant="h6"
          noWrap
          component="a"
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
          onClick={() => navigate('/')}
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
              <Link to={page.url}  key={index}>
              <MenuItem onClick={handleCloseNavMenu} >
                <Typography textAlign="center">{page.name}</Typography>
              </MenuItem>
              </Link>
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
        <Box sx={{ flexGrow: 0, marginRight:"20px" }}>
        <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              
            />
          </Search>
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Stack direction="row" spacing={2}>
            <Avatar sx={{ bgcolor: "#222831", color: "#00ADB5"} }>{(accname.substring(0,2)).toUpperCase()}</Avatar>
            </Stack>
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