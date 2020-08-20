import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ChangePlaceButton from './ChangePlaceButton';
import DoorAuthorizationButton from './DoorAuthorizationButton';
import EditDepartmentInfoButton from './EditDepartmentInfoButton';
import DeleteDepartmentButton from './DeleteDepartmentButton';

const useStyles = makeStyles( (theme) => ({
    root: {
        textAlign: 'center'
    },
    button: {
        marginTop: '1vh'
    }
}))

export default props => {
    
    const { departmentId } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.button}>
                <EditDepartmentInfoButton departmentId={departmentId} />
            </div>
            <div className={classes.button}>
                <ChangePlaceButton />
            </div>
            <div className={classes.button}>
                <DoorAuthorizationButton departmentId={departmentId}/>
            </div>
            <div className={classes.button}>
                <DeleteDepartmentButton />
            </div>
        </div>
    )
}