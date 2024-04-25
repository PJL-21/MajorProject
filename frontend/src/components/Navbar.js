import React from 'react';
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    //LOGOUT MODAL 
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Expense Tracker
        </Typography>
        {isAuthenticated() ? (
          <Button color="inherit" component={Link} to="/dashboard">
            Dashboard
          </Button>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
        {isAuthenticated() && (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;