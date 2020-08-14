import React from 'react';
import {
    IconButton,
} from '@material-ui/core';
import {
    Settings as EditIcon
} from '@material-ui/icons';
import { useDispatch } from 'react-redux';


import { updatePlace } from '../../../../../../store/actions/place.action';

import EditFullScreenDialog from './EditFullScreenDialog';

export default (props) => {

    const { placeId } = props;

    const dispatch = useDispatch();

    const [dialog, setDialog] = React.useState(false);

    const handleDialogClickOpen = () => {
        setDialog(true);
    }

    const handleDialogClose = () => {
        setDialog(false);
    }

    const handleUpdate =  (updatedPlace) => {
        dispatch(updatePlace({placeId: placeId, updatedPlace: updatedPlace}));
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
                placeId={placeId}
            />
        </React.Fragment>
    )
}