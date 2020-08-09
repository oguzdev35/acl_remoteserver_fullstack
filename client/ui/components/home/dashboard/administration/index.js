import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import VerticalTab from './VerticalTab';
import Content from './Content';

const useStyles = makeStyles( theme => ({
  root: {
    flexGrow: 1,
    maxWidth: '30vw',
    display: 'flex',
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

const ContentA = () => <>ContentA</>;
const ContentB = () => <>ContentB</>;

const contents = [
  {
    idx: 0, label: 'Content A', 
    Component: contentInjection(ContentA, {name: "Oguz"})
  },
  {
    idx: 1, label: 'Content B', 
    Component: contentInjection(ContentB)
  }
]

export default () => {

  const classes = useStyles();
  const [contentValue, setContentValue] = React.useState(0);

  return (
    <div className={classes.root}>
        <VerticalTab 
          setContentValue={setContentValue} 
          contentValue={contentValue} 
          contents={contents}
        />
        <Content 
          value={contentValue} 
          contents={contents}
          className={classes.content}
        />
    </div>
  )
}


