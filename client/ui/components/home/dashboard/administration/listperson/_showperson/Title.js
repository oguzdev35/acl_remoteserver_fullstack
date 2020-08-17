import React from 'react';
import {
    AppBar, Toolbar, IconButton,
    Typography
} from '@material-ui/core';
import {
    Close as CloseIcon,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1
    }
}));

export default props => {
    const classes = useStyles();
    const {handleClose, text} = props;

    return (
        <AppBar className={classes.appBar}>
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    {text}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}