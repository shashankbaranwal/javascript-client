import React from 'react';
import { Error, Input } from './style';

export const TextField = (props) => {
  // eslint-disable-next-line react/prop-types
  const { value, disabled, error } = props;
  if (error) {
    return (
      <>
        <Input type="text" value={value} error />
        <Error>{error}</Error>
      </>
    );
  }
  return (
    <Input type="text" value={value} disabled={disabled} />
  );
};
