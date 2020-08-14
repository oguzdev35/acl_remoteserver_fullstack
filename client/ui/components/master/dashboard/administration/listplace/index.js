import React from 'react';
import {
    makeStyles
} from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';


import Title from './Title';
import TablePlace from './TablePlace';
import SelectUser from './SelectUser';

import { listPlace } from '../../../../../../store/actions/place.action';


const useStyles = makeStyles( (theme) => ({
    root: {
        margin: theme.spacing(2),
        minWidth: '70vw'
    }
}));

export default (props) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [selectedUser, setSelectedUser] = React.useState({
        userId: '', username: ''
    });

    const handleChange = event => {
        const newUser = event.target.value;
        setSelectedUser({
            userId: newUser.userId,
            username: newUser.username
        });

        dispatch(listPlace({userId: newUser._id}));
    }

    return (
        <div className={classes.root}>
            <Title text="Kayıtlı Yer Listesi" />
            <SelectUser selectedUser={selectedUser} handleChange={handleChange} />
            <TablePlace />
        </div>
    )
}