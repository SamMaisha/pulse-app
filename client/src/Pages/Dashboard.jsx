import React from 'react';
import { Grid, Hidden } from '@mui/material';
import User  from '../components/User';
import QuickLinks from '../components/QuickLinks';
import Careers from '../components/Careers';
import Skills from '../components/Skills';
import Opportunities from '../components/Opportunities';
import CoverLetter from '../components/CoverLetter';

const Dashboard = () => {
  return (
    <>
      <Hidden smDown>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Grid container spacing={10}>
              <Grid item xs={3}>
                <User />
              </Grid>
              <Grid item xs={8.1}>
                <QuickLinks />
              </Grid>
            </Grid>
            <Careers />
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Skills />
              </Grid>
              <Grid item xs={8}>
                <Opportunities />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <CoverLetter />
          </Grid>
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <User />
          </Grid>
          <Grid item>
            <QuickLinks />
          </Grid>
          <Grid item>
            <Skills />
          </Grid>
          <Grid item>
            <Opportunities />
          </Grid>
          <Grid item>
            <CoverLetter />
          </Grid>
        </Grid>
      </Hidden>
    </>
  );
};

export default Dashboard;
