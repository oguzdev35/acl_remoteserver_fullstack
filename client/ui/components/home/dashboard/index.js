import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import Bar from './Bar';
import Content from './Content';

import Administration from './administration';

const useStyles = makeStyles( theme => ({
  root: {
    flexGrow: 1,
  },
  gridTop: {
    marginTop: theme.spacing(0),
  },
  gridBottom: {
    marginTop: theme.spacing(1)
  },
  content: {
    margin: theme.spacing(1)
  }
}));


const contentInjection = (Component, props) => () => {

  const classes = useStyles();

  return <div className={classes.content}>
    <Component {...props} />
  </div>

}

const Panel = () => <>Panel</>;

const contents = [
  {
    idx: 0, label: 'YÖNETİM PANELİ', 
    Component: contentInjection(Administration, {name: "Oguz"})
  },
  {
    idx: 1, label: 'Panel', 
    Component: contentInjection(Panel)
  }
]

export default () => {

  const classes = useStyles();
  const [contentValue, setContentValue] = React.useState(0);

  return (
    <Grid 
      container 
      direction='column'
      alignItems='center'
      className={classes.root}
    >
      <Grid 
        item xs={12} sm={12}
        className={classes.gridTop}
      >
        <Bar 
          setContentValue={setContentValue} 
          contentValue={contentValue} 
          contents={contents}
        />
      </Grid>
      <Grid 
        className={classes.gridBottom}
        item xs={12} sm={12}>
        <Content 
          value={contentValue} 
          contents={contents}
        />
      </Grid>
    </Grid>
  )
}
