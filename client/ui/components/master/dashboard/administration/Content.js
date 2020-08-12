import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import VerticalTabContent from './VerticalTabContent';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(0),
  },
}));



export default (props) => {

  const {value, contents} = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      {contents.map( ({idx, Component}, index) => {
        return (
          <VerticalTabContent key={index} value={value} index={idx} >
            <Component />
          </VerticalTabContent>
        )
      })}
    </div>
  )
}
