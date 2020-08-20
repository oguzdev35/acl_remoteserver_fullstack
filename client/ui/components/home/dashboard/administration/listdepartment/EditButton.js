import React from 'react';
import {
    IconButton,
} from '@material-ui/core';
import {
    Settings as EditIcon
} from '@material-ui/icons';
import { useDispatch, useStore } from 'react-redux';


import { updateDepartment } from '../../../../../../store/actions/department.action';

import EditFullScreenDialog from './EditFullScreenDialog';

export default (props) => {

    const { departmentId } = props;

    const dispatch = useDispatch();
    const globalState = useStore().getState();

    const [dialog, setDialog] = React.useState(false);

    const handleDialogClickOpen = () => {
        setDialog(true);
    }

    const handleDialogClose = () => {
        setDialog(false);
    }

    const handleUpdate =  (updatedDepartment) => {
        const placeId = globalState.places.find(({persons}) => persons.includes(personId))._id;
        const userId = globalState.users.find(({places}) => places.includes(placeId))._id;
        dispatch(updateDepartment({
            departmentId: departmentId, 
            placeId: placeId,
            userId: userId,
            updatedDepartment: updatedDepartment
        }));
        setDialog(false);
    }

    return (
        <React.Fragment>
            <IconButton 
                onClick={handleDialogClickOpen}
            >
                <EditIcon />
            </IconButton>
            <EditFullScreenDialog 
                handleClose={handleDialogClose} 
                open={dialog} 
                handleUpdate={handleUpdate}
                departmentId={departmentId}
            />
        </React.Fragment>
    )
}