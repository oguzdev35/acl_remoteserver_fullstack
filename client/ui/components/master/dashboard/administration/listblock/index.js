import React from 'react';
import {
    makeStyles
} from '@material-ui/core/styles';
import { useDispatch, useStore } from 'react-redux';


import Title from './Title';
import TableBlock from './TableBlock';
import SelectPlace from './SelectPlace';

import { clearBlock, listBlock } from '../../../../../../store/actions/block.action';


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
            dispatch(listBlock({
                placeId: selectedPlace, 
                userId: globalState.users.find(({places}) => places.includes(selectedPlace))._id
            }));
        }

    }, [selectedPlace])

    React.useEffect( () => {
        setSelectedPlace("")
        if(selectedPlace == ""){
            dispatch(clearBlock());
        }
    }, [])

    const handleChange = event => {
        setSelectedPlace(event.target.value);
    }

    return (
        <div className={classes.root}>
            <Title text="Kayıtlı Blok Listesi" />
            <SelectPlace selectedPlace={selectedPlace} handleChange={handleChange} />
            <TableBlock />
        </div>
    )
}