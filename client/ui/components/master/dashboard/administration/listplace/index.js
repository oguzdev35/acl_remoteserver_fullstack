import React from 'react';
import {
    makeStyles
} from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';


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

    const [selectedUser, setSelectedUser] = React.useState("");

    React.useEffect( () => {
        if(selectedUser != "" && selectedUser != undefined){
            dispatch(listPlace({userId: selectedUser}))
        }
    }, [selectedUser])

    const handleChange = event => {
        setSelectedUser(event.target.value);
    }

    return (
        <div className={classes.root}>
            <Title text="Kayıtlı Yer Listesi" />
            <SelectUser selectedUser={selectedUser} handleChange={handleChange} />
            <TablePlace />
        </div>
    )
}