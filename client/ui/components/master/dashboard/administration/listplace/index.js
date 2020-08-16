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

    const [selectedUser, setSelectedUser] = React.useState(useSelector(state => state.user._id));
    const [loading, setLoading] = React.useState(true);

    React.useEffect( () => {
        Promise.resolve(dispatch(listPlace({userId: selectedUser})))
            .then( () => setLoading(false))
            .catch( err => console.log(err.message) );
    }, [selectedUser])

    const handleChange = event => {
        setSelectedUser(event.target.value);
    }

    if(loading){
        return <>Loading</>
    }

    return (
        <div className={classes.root}>
            <Title text="Kayıtlı Yer Listesi" />
            <SelectUser selectedUser={selectedUser} handleChange={handleChange} />
            <TablePlace selectedUser={selectedUser} />
        </div>
    )
}