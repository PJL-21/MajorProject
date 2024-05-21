import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import LogoutModal from "./LogoutModal";
import { Text, Button, NavLink } from "@mantine/core";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const history = useHistory();

  const handleLogout = () => {
    setLogoutModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    setLogoutModalOpen(false);
    history.push("/");
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
          <NavLink
            component={Link}
            to="/expense-items"
            label="Expense Items"
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
