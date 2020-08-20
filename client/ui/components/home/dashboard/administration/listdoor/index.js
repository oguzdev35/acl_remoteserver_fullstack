import React from 'react';
import {
    makeStyles
} from '@material-ui/core/styles';
import { useDispatch, useSelector, useStore } from 'react-redux';


import Title from './Title';
import TableDoor from './TableDoor';
import SelectPlace from './SelectPlace';
import SelectBlock from './SelectBlock';

import { listDoor, clearDoor } from '../../../../../../store/actions/door.action';
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
    const globalState = useStore().getState();

    const [selectedPlace, setSelectedPlace] = React.useState("");
    const [selectedBlock, setSelectedBlock] = React.useState("");

    const handleChangePlace = event => {
        if(selectedPlace){
            setSelectedBlock("");
        }
        const newPlaceId = event.target.value;
        setSelectedPlace(newPlaceId);
        dispatch(listBlock({
            placeId: newPlaceId,
            userId: globalState.user._id
        }))
    }

    const handleChangeBlock = event => {
        const newBlockId = event.target.value;
        setSelectedBlock(newBlockId);
        dispatch(listDoor({
            blockId: newBlockId,
            placeId: selectedPlace,
            userId: globalState.user._id
        }))

    }

    React.useEffect( () => {
        setSelectedPlace("")
        setSelectedBlock("");
        if(selectedPlace == "" && selectedBlock == ""){
            dispatch(clearDoor());
        }
    }, [])

    return (
        <div className={classes.root}>
            <Title text="Kayıtlı Kapı Listesi" />
            <SelectPlace selectedPlace={selectedPlace} handleChange={handleChangePlace} />
            {selectedPlace && <SelectBlock selectedBlock={selectedBlock} handleChange={handleChangeBlock} placeId={selectedPlace}/>}
            <TableDoor />
        </div>
    )
}