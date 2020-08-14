import React from 'react';
import {
    makeStyles
} from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';


import Title from './Title';
import TablePlace from './TablePlace';
import SelectUser from './SelectUser';

import { listBlock } from '../../../../../../store/actions/block.action';


const useStyles = makeStyles( (theme) => ({
    root: {
        margin: theme.spacing(2),
        minWidth: '70vw'
    }
}));

export default (props) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [selectedPlace, setSelectedPlace] = React.useState(useSelector(state => state.places[0]._id));

    React.useEffect( () => {
        dispatch(listBlock({placeId: selectedPlace}));
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