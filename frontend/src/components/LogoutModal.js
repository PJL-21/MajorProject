import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import Modal from './Modal'; 
const LogoutModal = ({ open, onClose, onConfirm }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Typography variant="h6">Logout Confirmation</Typography>
      <Typography variant="body1">Are you sure you want to logout?</Typography>
      <Button onClick={onConfirm} color="primary">Confirm</Button>
      <Button onClick={onClose} color="secondary">Cancel</Button>
    </Modal>
  );
};

LogoutModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default LogoutModal;
