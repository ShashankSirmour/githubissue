/* eslint-disable jsx-a11y/anchor-is-valid */
import { useTheme } from '@emotion/react';
import { Grid, Link, useMediaQuery } from '@mui/material';
import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function GithubFooter() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Grid
      container
      py={4}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        item
        container
        justifyContent={{ xs: 'center', md: 'space-between' }}
      >
        <Link px={0.5} href="#" underline="hover">
          Terms
        </Link>
        <Link px={0.5} href="#" underline="hover">
          Privacy
        </Link>
        <Link px={0.5} href="#" underline="hover">
          Security
        </Link>
        <Link px={0.5} href="#" underline="hover">
          Status
        </Link>
        <Link px={0.5} href="#" underline="hover">
          Docs
        </Link>
        {isMdUp && (
          <Grid item>
            <GitHubIcon />
          </Grid>
        )}
        <Link px={0.5} href="#" underline="hover">
          Contact Github
        </Link>
        <Link px={0.5} href="#" underline="hover">
          Pricing
        </Link>
        <Link px={0.5} href="#" underline="hover">
          API Tracking
        </Link>
        <Link px={0.5} href="#" underline="hover">
          About
        </Link>
        <Link px={0.5} href="#" underline="hover">
          Blog
        </Link>
      </Grid>
      {!isMdUp && (
        <Grid item mt={1}>
          <GitHubIcon />
        </Grid>
      )}
    </Grid>
  );
}
