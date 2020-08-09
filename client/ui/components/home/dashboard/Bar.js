import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';




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
        <Tabs value={contentValue} onChange={handleChange} aria-label="simple tabs example">
          {contents.map( ({label}, index) => <Tab key={index} label={label} />)}
        </Tabs>
      </AppBar>
    </div>
  );
}