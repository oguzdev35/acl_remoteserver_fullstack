import React from 'react';
import {
    IconButton,
} from '@material-ui/core';
import {
    Settings as EditIcon
} from '@material-ui/icons';
import { useDispatch, useStore } from 'react-redux';


import { updatePerson } from '../../../../../../store/actions/person.action';

import EditFullScreenDialog from './EditFullScreenDialog';

export default (props) => {

    const { personId } = props;

    const dispatch = useDispatch();
    const globalState = useStore().getState();

    const [dialog, setDialog] = React.useState(false);

    const handleDialogClickOpen = () => {
        setDialog(true);
    }

    const handleDialogClose = () => {
        setDialog(false);
    }

    const handleUpdate =  (updatedPerson) => {
        const placeId = globalState.places.find(({persons}) => persons.includes(personId))._id;
        const userId = globalState.users.find(({places}) => places.includes(placeId))._id;
        console.log(updatedPerson)
        dispatch(updatePerson({
            personId: personId, 
            placeId: placeId,
            userId: userId,
            updatedPerson: updatedPerson
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
                personId={personId}
            />
        </React.Fragment>
    )
}