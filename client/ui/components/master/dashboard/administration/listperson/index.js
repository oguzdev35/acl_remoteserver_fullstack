import React from 'react';
import {
    makeStyles
} from '@material-ui/core/styles';
import { useDispatch, useStore } from 'react-redux';


import Title from './Title';
import TablePerson from './TablePerson';
import SelectPlace from './SelectPlace';

import { listPerson, clearPerson } from '../../../../../../store/actions/person.action';


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
            dispatch(listPerson({
                placeId: selectedPlace, 
                userId: globalState.users.find(({places}) => places.includes(selectedPlace))._id
            }));
        }
    }, [selectedPlace])

    const handleChange = event => {
        setSelectedPlace(event.target.value);
    }

    React.useEffect( () => {
        setSelectedPlace("")
        if(selectedPlace == ""){
            dispatch(clearPerson());
        }
    }, [])

    return (
        <div className={classes.root}>
            <Title text="Kayıtlı Personel Listesi" />
            <SelectPlace selectedPlace={selectedPlace} handleChange={handleChange} />
            <TablePerson />
        </div>
    )
}