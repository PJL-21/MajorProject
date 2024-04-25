import React from 'react';
import PropTypes from 'prop-types';
import { Button as MUIButton } from '@material-ui/core';

const Button = ({ variant, color, onClick, children, ...rest }) => {
  return (
    <MUIButton variant={variant} color={color} onClick={onClick} {...rest}>
      {children}
    </MUIButton>
  );
};

Button.propTypes = {
  variant: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  variant: 'contained',
  color: 'primary',
  onClick: () => {},
};

export default Button;