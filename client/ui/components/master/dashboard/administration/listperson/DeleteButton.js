import React from 'react';
import {
    IconButton,
} from '@material-ui/core';
import {
    Delete as DeleteIcon
} from '@material-ui/icons';
import { useDispatch, useStore } from 'react-redux';


import { deletePerson } from '../../../../../../store/actions/person.action';

import DeleteDraggableDialog from './DeleteDraggableDialog';

export default (props) => {

    const dispatch = useDispatch();
    const globalState = useStore().getState();
    const { personId } = props;

    const [dialog, setDialog] = React.useState(false);

    const handleDialogClickOpen = () => {
        setDialog(true);
    }

    const handleDialogClose = () => {
        setDialog(false);
    }

    const handleDeletion = (events) => {
        const placeId = globalState.places.find(({persons}) => persons.includes(personId))._id;
        const userId = globalState.users.find(({places}) => places.includes(placeId))._id;
        dispatch(deleteBlock({
            personId: personId,
            placeId: placeId,
            userId: userId
        }));
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