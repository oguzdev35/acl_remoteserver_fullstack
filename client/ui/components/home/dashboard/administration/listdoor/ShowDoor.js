import React from 'react';
import {
  Link, Typography, Modal
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ShowDoorFullScreenDialog from './ShowDoorFullScreenDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  link: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
}));

export default props => {
  const classes = useStyles();

  const [dialog, setDialog] = React.useState(false);

  const { name, doorId } = props;

  const handleClickOpen = (ev) => {
    ev.preventDefault();
    setDialog(true)
  }

  const handleClose = () => {
    setDialog(false);
  }

  return (
    <React.Fragment>
      <Typography className={classes.root}>
        <Link  className={classes.link} onClick={handleClickOpen}>
          {name}
        </Link>
      </Typography>
      <ShowDoorFullScreenDialog 
        handleClose={handleClose}
        open={dialog}
        doorId={doorId}
      />

    </React.Fragment>
  )
}