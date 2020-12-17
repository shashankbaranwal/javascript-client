import React from 'react';
import { TextField } from '../../components';

// eslint-disable-next-line react/prefer-stateless-function
export const TextFieldDemo = () => (
  <>
    <p><b>This is a Disabled Input</b></p>
    <TextField
      disabled
      value="Disabled Input"
    />
    <p><b>A valid Input</b></p>
    <TextField value="Accessible" />

    <p><b>An Input With Errors</b></p>
    <TextField value="101" error="Cloud not be greater than" />
  </>
);
