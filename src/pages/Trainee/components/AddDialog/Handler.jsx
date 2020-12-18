// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment } from '@material-ui/core';

export default function Handler(props) {
  const {
    error, helperText, onChange, onBlur, label, type, icons,
  } = props;
  const Icon = icons;
  return (
    <>
      <TextField
        required
        id="outlined-required"
        label={label}
        variant="outlined"
        fullWidth
        onChange={onChange}
        onBlur={onBlur}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon />
            </InputAdornment>
          ),
        }}
        helperText={helperText}
        error={error}
        type={type}
      />
    </>
  );
}
Handler.propTypes = {
  error: PropTypes.bool,
  helperText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  icons: PropTypes.instanceOf(Object),
};
Handler.defaultProps = {
  error: false,
  helperText: '',
  label: '',
  type: false,
  icons: {},
};
