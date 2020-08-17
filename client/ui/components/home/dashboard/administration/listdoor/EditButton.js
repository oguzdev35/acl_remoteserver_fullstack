import React from 'react';
import {
    IconButton,
} from '@material-ui/core';
import {
    Settings as EditIcon
} from '@material-ui/icons';
import { useDispatch, useStore } from 'react-redux';


import { updateDoor } from '../../../../../../store/actions/door.action';

import EditFullScreenDialog from './EditFullScreenDialog';

export default (props) => {

    const { doorId } = props;

    const dispatch = useDispatch();
    const globalState = useStore().getState();

    const [dialog, setDialog] = React.useState(false);

    const handleDialogClickOpen = () => {
        setDialog(true);
    }

    const handleDialogClose = () => {
        setDialog(false);
    }

    const handleUpdate =  (updatedDoor) => {
        const blockId = globalState.places.find(({doors}) => doors.includes(doorId))._id;
        const placeId = globalState.places.find(({blocks}) => blocks.includes(blockId))._id;
        const userId = globalState.users.find(({places}) => places.includes(placeId))._id;
        dispatch(updateDoor({
            doorId: doorId,
            blockId: blockId,
            placeId: placeId,
            userId: userId,
            updatedDoor: updatedDoor
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
                doorId={doorId}
            />
        </React.Fragment>
    )
}