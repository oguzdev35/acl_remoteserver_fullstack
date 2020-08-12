import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar, Tabs, Tab, Button, Toolbar
} from '@material-ui/core';

import MenuIcon from './MenuIcon';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    minWidth: '98vw',
    margin: theme.spacing(0)
  },
}));

export default (props) => {
  const {setContentValue, contentValue, contents} = props;
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setContentValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Tabs value={contentValue} onChange={handleChange} style={{flex: 1}}>
            {contents.map( ({label}, index) => <Tab key={index} label={label} />)}
          </Tabs>
          <MenuIcon />
        </Toolbar>
      </AppBar>
    </div>
  );
}