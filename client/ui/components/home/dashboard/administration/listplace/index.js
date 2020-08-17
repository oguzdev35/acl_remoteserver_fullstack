import React from 'react';
import {
    makeStyles
} from '@material-ui/core/styles';
import { useDispatch, useStore } from 'react-redux';


import Title from './Title';
import TablePlace from './TablePlace';

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
    const globalState = useStore().getState();

    React.useEffect( () => {
        dispatch(listPlace({userId: globalState.user._id}))
    }, [])


    return (
        <div className={classes.root}>
            <Title text="Kayıtlı Yer Listesi" />
            <TablePlace />
        </div>
    )
}