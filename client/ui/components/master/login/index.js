import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid
} from '@material-ui/core';


import WelcomeTitle from './WelcomeTitle';
import Login from './Login';

const useStyles = makeStyles( theme => ({
  root: {
    flexGrow: 1,
  },
  gridTop: {
    marginTop: '20vh'
  },
  gridBottom: {
    marginTop: '10vh'
  }
}));

export default () => {

  const classes = useStyles();

  return (
    <Grid 
      container 
      direction='column'
      alignItems='center'
      className={classes.root}
    >
      <Grid 
        item xs={10} sm={8}
        className={classes.gridTop}
      >
        <WelcomeTitle />
      </Grid>
      <Grid 
        className={classes.gridBottom}
        item xs={10} sm={8}>
        <Login />
      </Grid>
    </Grid>
  )
}
