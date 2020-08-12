import React from 'react';
import {
    IconButton,
} from '@material-ui/core';
import {
    Settings as EditIcon
} from '@material-ui/icons';
import { useDispatch } from 'react-redux';


import { updatePerson } from '../../../../../../store/actions/person.action';

import EditFullScreenDialog from './EditFullScreenDialog';

export default (props) => {

    const { personId } = props;

    const dispatch = useDispatch();

    const [dialog, setDialog] = React.useState(false);

    const handleDialogClickOpen = () => {
        setDialog(true);
    }

    const handleDialogClose = () => {
        setDialog(false);
    }

    const handleUpdate =  updatedPerson => (events) => {
        console.log('handleUpdate')
        dispatch(updatePerson({personId: personId, updatedPerson: updatedPerson}));
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