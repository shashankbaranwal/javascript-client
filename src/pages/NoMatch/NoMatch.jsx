import React from 'react';
import { Typography } from '@material-ui/core';

const NotFound = () => (
  <div>
    <br />
    <Typography variant="h3" align="center">Not Found!</Typography>
    <br />
    <Typography variant="body1" color="textSecondary" align="center">
      Seems like the page you are looking for after does not exists
    </Typography>
  </div>
);

export default NotFound;
