import React from 'react';
import {
    IconButton,
} from '@material-ui/core';
import {
    Delete as DeleteIcon
} from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { deletePerson } from '../../../../../../store/actions/person.action';

export default (props) => {
    const dispatch = useDispatch();

    const handleDeletion = (events) => {
        dispatch(deletePerson({personId: props.personId}));
    }

    return (
        <IconButton 
            onClick={handleDeletion}
        >
            <DeleteIcon />
        </IconButton>
    )
}