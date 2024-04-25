import React from 'react';
import { Typography, Link } from '@material-ui/core';

const ContactPage = () => {
  return (
    <div>
      <Typography variant="h4">Contact Us</Typography>
      <Typography variant="body1">
        If you have any questions or need assistance, please feel free to contact us at{' '}
        <Link href="mailto:admin@example.com">admin@example.com</Link>.
      </Typography>
    </div>
  );
};

export default ContactPage;