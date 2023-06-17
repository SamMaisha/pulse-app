import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Slide,
  Box,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import logo from "../imgs/pulse.png";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { logout, isAuthenticated, loginWithRedirect } = useAuth0();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          boxShadow: "none",
          borderRadius: "10px",
        }}
      >
        <Toolbar sx={{ flexGrow: 1, justifyContent: "space-between" }}>
          <img
            src={logo}
            alt="logo"
            style={{ width: "50px", height: "auto" }}
          />

          {!isAuthenticated && (
            <Box display="flex">
              <ListItem component={Link} to="/About">
                <ListItemText className="title" primary="ABOUT" />
              </ListItem>
              <ListItem component={Link} onClick={() => loginWithRedirect()}>
                <ListItemText className="title" primary="LOGIN" />
              </ListItem>
            </Box>
          )}

          {isAuthenticated && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {isAuthenticated && (
        <Drawer
          anchor="right"
          open={isDrawerOpen}
          onClose={toggleDrawer}
          TransitionComponent={Slide}
          TransitionProps={{
            direction: "left",
            timeout: 10000,
          }}
          sx={{
            width: 300,
            flexShrink: 0,
            "& .MuiDrawer-paper": { width: 400, backgroundColor: "#487a6c" },
          }}
        >
          <List>
            <ListItem component={Link} to="/dashboard">
              <ListItemText className="title" primary="DASHBOARD" />
            </ListItem>
            <ListItem component={Link} to="/About">
              <ListItemText className="title" primary="ABOUT PULSE" />
            </ListItem>
            <ListItem component={Link} onClick={() => logout()}>
              <ListItemText className="title" primary="LOGOUT" />
            </ListItem>
          </List>
        </Drawer>
      )}
    </>
  );
};

export default Navbar;
