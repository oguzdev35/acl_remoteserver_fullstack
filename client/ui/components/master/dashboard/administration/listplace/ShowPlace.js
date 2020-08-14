import React from 'react';
import {
  Link, Typography, Modal
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ShowPlaceFullScreenDialog from './ShowPlaceFullScreenDialog';

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

  const { placename, placeId } = props;

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
          {placename}
        </Link>
      </Typography>
      <ShowPlaceFullScreenDialog 
        handleClose={handleClose}
        open={dialog}
        placeId={placeId}
      />

    </React.Fragment>
  )
}