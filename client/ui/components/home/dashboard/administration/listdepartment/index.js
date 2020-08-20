import React from 'react';
import {
    makeStyles
} from '@material-ui/core/styles';
import { useDispatch, useStore } from 'react-redux';


import Title from './Title';
import TableDepartment from './TableDepartment';
import SelectPlace from './SelectPlace';

import { listDepartment, clearDepartment } from '../../../../../../store/actions/department.action';


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

    const [selectedPlace, setSelectedPlace] = React.useState("");

    React.useEffect( () => {
        if(selectedPlace != "" && selectedPlace != undefined){
            dispatch(listDepartment({
                placeId: selectedPlace, 
                userId: globalState.user._id
            }));
        }
    }, [selectedPlace])

    const handleChange = event => {
        setSelectedPlace(event.target.value);
    }

    React.useEffect( () => {
        setSelectedPlace("")
        if(selectedPlace == ""){
            dispatch(clearDepartment());
        }
    }, [])


    return (
        <div className={classes.root}>
            <Title text="Kayıtlı Departman Listesi" />
            <SelectPlace selectedPlace={selectedPlace} handleChange={handleChange} />
            <TableDepartment />
        </div>
    )
}