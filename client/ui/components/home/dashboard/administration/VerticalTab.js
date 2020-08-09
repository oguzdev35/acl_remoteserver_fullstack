import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Typography } from '@material-ui/core';




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(0),
  },
  tab: {
    textTransform: 'capitalize'
  }
}));

export default (props) => {
  const {setContentValue, contentValue, contents} = props;
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setContentValue(newValue);
  };


  return (
    <div className={classes.root}>
        <Tabs 
          orientation="vertical"
          variant="scrollable"
          value={contentValue} onChange={handleChange} >
          {contents.map( ({label}, index) => <Tab className={classes.tab} key={index} label={label} />)}
        </Tabs>
    </div>
  );
}