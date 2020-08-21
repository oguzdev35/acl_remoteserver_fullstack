import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ChangePlaceButton from './ChangePlaceButton';
import DepartmentAssignment from './DepartmentAssignment';
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
    
    const { personId } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.button}>
                <EditPersonInfoButton personId={personId} />
            </div>
            <div className={classes.button}>
                <ChangePlaceButton />
            </div>
            <div className={classes.button}>
                <DepartmentAssignment personId={personId}/>
            </div>
            <div className={classes.button}>
                <DeletePersonButton />
            </div>
        </div>
    )
}