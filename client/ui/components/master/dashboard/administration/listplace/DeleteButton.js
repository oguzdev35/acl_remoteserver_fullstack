import React from 'react';
import {
    IconButton,
} from '@material-ui/core';
import {
    Delete as DeleteIcon
} from '@material-ui/icons';
import { useDispatch, useStore } from 'react-redux';


import { deletePlace } from '../../../../../../store/actions/place.action';

import DeleteDraggableDialog from './DeleteDraggableDialog';

export default (props) => {

    const dispatch = useDispatch();

    const [dialog, setDialog] = React.useState(false);

    const { placeId, userId } = props

    const handleDialogClickOpen = () => {
        setDialog(true);
    }

    const handleDialogClose = () => {
        setDialog(false);
    }

    const handleDeletion = (events) => {
        dispatch(deletePlace({placeId: placeId, userId: userId}));
        setDialog(false);
    }

    return (
        <React.Fragment>
            <IconButton 
                onClick={handleDialogClickOpen}
            >
                <DeleteIcon />
            </IconButton>
            <DeleteDraggableDialog 
                handleClose={handleDialogClose} 
                open={dialog} 
                handleDeletion={handleDeletion}
            />
        </React.Fragment>
    )
}