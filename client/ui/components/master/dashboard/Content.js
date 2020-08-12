import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TabContent from './TabContent';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    minWidth: '98vw',
    margin: theme.spacing(0)
  },
}));



export default (props) => {

  const {value, contents} = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      {contents.map( ({idx, Component}, index) => {
        return (
          <TabContent key={index} value={value} index={idx} >
            <Component />
          </TabContent>
        )
      })}
    </div>
  )
}
