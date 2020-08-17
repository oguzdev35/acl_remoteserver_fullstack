import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ChangePlaceButton from './ChangePlaceButton';
import DoorAuthorizationButton from './DoorAuthorizationButton';
import EditPersonInfoButton from './EditPersonInfoButton';
import DeletePersonButton from './DeletePersonButton';

const useStyles = makeStyles( (theme) => ({
    root: {
        textAlign: 'center'
    },
    button: {
        marginTop: '1vh'
    }
}))

export default props => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.button}>
                <EditPersonInfoButton />
            </div>
            <div className={classes.button}>
                <ChangePlaceButton />
            </div>
            <div className={classes.button}>
                <DoorAuthorizationButton />
            </div>
            <div className={classes.button}>
                <DeletePersonButton />
            </div>
        </div>
    )
}