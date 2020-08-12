import React from 'react';
import {
    IconButton,
} from '@material-ui/core';
import {
    Settings as EditIcon
} from '@material-ui/icons';
import { useDispatch } from 'react-redux';


import { updateUser } from '../../../../../../store/actions/users.action';

import EditFullScreenDialog from './EditFullScreenDialog';

export default (props) => {

    const { userId } = props;

    const dispatch = useDispatch();

    const [dialog, setDialog] = React.useState(false);

    const handleDialogClickOpen = () => {
        setDialog(true);
    }

    const handleDialogClose = () => {
        setDialog(false);
    }

    const handleUpdate =  (updatedUser) => {
        console.log(updatedUser)
        dispatch(updateUser({userId: userId, updatedUser: updatedUser}));
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
                userId={userId}
            />
        </React.Fragment>
    )
}