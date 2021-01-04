/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Box, Typography, Link } from '@material-ui/core';

const Footer = () => (
  <>
    <Box mt={6}>
      <Typography variant="body2" color="textSecondary" align="center">

        <Link color="inherit" href="https://successive.tech/">
          <p>
            {' © '}
            {' '}
            Successive Technologies
          </p>
        </Link>
        {' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  </>
);
export default Footer;
