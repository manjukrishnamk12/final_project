import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from './images/logo.svg';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';
import Login from './Login';

const Navbar = () => {
  const [openLogin, setOpenLogin] = useState(false);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#2196f3', // Set your desired primary color
      },
      background: {
        default: 'red', // Set your desired background color
      },
    },
  });

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenLogin = () => {
    setOpenLogin(true);
    handleCloseNavMenu(); // Close the menu when login is opened
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: 'beige', width: '100%' }}>
      <Toolbar disableGutters>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, width: '100%' }}>
          <IconButton
            size="large"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            style={{ color: 'black' }}
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
            }}
          >
            <MenuItem onClick={handleCloseNavMenu}>
              <Typography textAlign="center">
                <Link to={'/'} style={{ color: 'black', textDecoration: 'none' }}>
                  Home
                </Link>
              </Typography>
            </MenuItem>
            <MenuItem>
              <Typography textAlign="center">
                <Link to={'/About'} style={{ color: 'black', textDecoration: 'none' }}>
                  About Us
                </Link>
              </Typography>
            </MenuItem>
            <MenuItem>
              <Typography textAlign="center">
                <Link to={'/Contact'} style={{ color: 'black', textDecoration: 'none' }}>
                  Contact Us
                </Link>
              </Typography>
            </MenuItem>
            <MenuItem>
              <Typography textAlign="center">
                <Button onClick={handleOpenLogin}>Login</Button>
              </Typography>
            </MenuItem>
          </Menu>

        </Box>


        <img
          src={logo}
          alt="Logo"
          style={{
            display: { xs: 'none', md: 'flex' },
            marginLeft: '25px',
            height: '80px',
            width: '250px',
          }}
        />

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', paddingRight: '15px' }}>
          <Button
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: 'black', display: 'block', fontSize: 'medium' }}
          >
            <Link to={'/'} style={{ color: 'black', textDecoration: 'none' }}>
              Home
            </Link>
          </Button>

          <Button
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: 'black', display: 'block', fontSize: 'medium' }}
          >
            <Link to={'/About'} style={{ color: 'black', textDecoration: 'none' }}>
              About Us
            </Link>
          </Button>
          <Button
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: 'black', display: 'block', fontSize: 'medium' }}
          >
            <Link to={'/Contact'} style={{ color: 'black', textDecoration: 'none' }}>
              Contact Us
            </Link>
          </Button>
          <LoginIcon
            color="primary"
            fontSize="large"
            style={{ marginLeft: '15px', marginTop: '20px' }}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleOpenLogin}
            sx={{
              my: 2,
              color: 'white',
              display: 'block',


              fontSize: 'medium',
            }}
          >
            Login
          </Button>
          <ThemeProvider theme={theme}>
            <Dialog open={openLogin} onClose={handleCloseLogin}>
              <DialogContent
                sx={{
                  backgroundColor: '#ffffff',
                  width: '100%',
                  maxWidth: '600px',
                  maxHeight: '100%',
                  overflowY: 'auto',
                  padding: '20px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  '@media (min-width: 600px)': {
                    width: '600px',
                    maxHeight: '80vh',
                  },
                }}
              >
                <Login />
              </DialogContent>
            </Dialog>
          </ThemeProvider>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;