import React from 'react';
import {
    IconButton,
} from '@material-ui/core';
import {
    Settings as EditIcon
} from '@material-ui/icons';
import { useDispatch, useStore } from 'react-redux';


import { updateBlock } from '../../../../../../store/actions/block.action';

import EditFullScreenDialog from './EditFullScreenDialog';

export default (props) => {

    const { blockId } = props;

    const dispatch = useDispatch();
    const globalState = useStore().getState();

    const [dialog, setDialog] = React.useState(false);

    const handleDialogClickOpen = () => {
        setDialog(true);
    }

    const handleDialogClose = () => {
        setDialog(false);
    }

    const handleUpdate =  (updatedBlock) => {
        const placeId = globalState.places.find(({blocks}) => blocks.includes(blockId))._id;
        const userId = globalState.users.find(({places}) => places.includes(placeId))._id;
        dispatch(updateBlock({
            blockId: blockId, 
            placeId: placeId,
            userId: userId,
            updatedBlock: updatedBlock
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
                blockId={blockId}
            />
        </React.Fragment>
    )
}