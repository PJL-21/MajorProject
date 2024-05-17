import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom"; // Import useHistory hook
import { useAuth } from "./AuthProvider";
import LogoutModal from "./LogoutModal";
import { Text, Button, NavLink } from "@mantine/core";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const history = useHistory(); // Initialize useHistory hook

  const handleLogout = () => {
    setLogoutModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    setLogoutModalOpen(false);
    history.push("/"); // Redirect to the landing page after logout
  };

  const handleLogoutCancel = () => {
    setLogoutModalOpen(false);
  };

  return (
    <>
      {isAuthenticated() && (
        <>
          <NavLink component={Link} to="/dashboard" label="Dashboard" />
          <NavLink
            component={Link}
            to="/expensing-info"
            label="Expensing Info"
          />
        </>
      )}
      {isAuthenticated() ? (
        <NavLink
          color="inherit"
          onClick={handleLogout}
          label="Logout"
          component="button"
        />
      ) : (
        <>
          <NavLink color="inherit" component={Link} to="/login" label="Login" />
          <NavLink color="inherit" component={Link} to="/register" label="Register" />
        </>
      )}
      <LogoutModal
        open={logoutModalOpen}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
};

export default Navbar;
