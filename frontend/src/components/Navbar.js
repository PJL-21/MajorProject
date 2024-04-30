import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory hook
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import InsightsIcon from '@mui/icons-material/Insights';
import LogoutModal from './LogoutModal';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const { isAuthenticated, logout } = useAuth();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const history = useHistory(); // Initialize useHistory hook

  const handleLogout = () => {
    setLogoutModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    setLogoutModalOpen(false);
    history.push('/'); // Redirect to the landing page after logout
  };

  const handleLogoutCancel = () => {
    setLogoutModalOpen(false);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Expense Tracker
          </Typography>
          {isAuthenticated() && (
            <Button color="inherit" component={Link} to="/dashboard">
              Dashboard
            </Button>
          )}
          {isAuthenticated() && (
            <Button color="inherit" component={Link} to="/expensing-info">
              Expensing Info
            </Button>
          )}
          {isAuthenticated() ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <LogoutModal
        open={logoutModalOpen}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
};

export default Navbar;
