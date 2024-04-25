import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

const InputField = ({ label, type, value, onChange, fullWidth, ...rest }) => {
  return (
    <TextField
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      fullWidth={fullWidth}
      {...rest}
    />
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  fullWidth: PropTypes.bool,
};

InputField.defaultProps = {
  type: 'text',
  fullWidth: false,
};

export default InputField;