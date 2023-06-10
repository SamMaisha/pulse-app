import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Slide } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import logo from '../imgs/pulse.png';

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { logout } = useAuth0();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', boxShadow: 'none', borderRadius: "10px" }}>
        <Toolbar sx={{ flexGrow: 1, justifyContent: 'space-between' }}>
          <img src={logo} alt="logo" style={{ width: '50px', height: 'auto' }} />
          
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        TransitionComponent={Slide}
        TransitionProps={{
          direction: 'left',
          timeout: 10000,
        }}
        sx={{ width: 300, flexShrink: 0, '& .MuiDrawer-paper': { width: 400, backgroundColor: 'rgba(91, 130, 130, 1)' }}}
      >
        <List>
          <ListItem component={Link} to="/">
            <ListItemText primary="HOME" />
          </ListItem>
          <ListItem component={Link} to="/dashboard">
            <ListItemText primary="DASHBOARD" />
          </ListItem>
          <ListItem component={Link} to="/Profile">
            <ListItemText primary="PROFILE" />
          </ListItem>
          <ListItem component={Link} to="/About">
            <ListItemText primary="ABOUT PULSE"  />
          </ListItem>
          <ListItem component={Link} onClick={() => logout()}>
            <ListItemText primary="LOGOUT" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
