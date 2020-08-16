import React from 'react';
import {
    makeStyles
} from '@material-ui/core/styles';
import { useDispatch, useStore } from 'react-redux';


import Title from './Title';
import TableDoor from './TableDoor';
import SelectPlace from './SelectPlace';
import SelectBlock from './SelectBlock';

import { listDoor } from '../../../../../../store/actions/door.action';


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

    React.useEffect( () => {
        if((selectedPlace != "" && selectedPlace != undefined) && (selectedBlock != "" && selectedBlock != undefined)){
            dispatch(listDoor({
                blockId: selectedBlock,
                placeId: selectedPlace, 
                userId: globalState.users.find(({places}) => places.includes(selectedPlace))._id
            }));
        }
    }, [selectedPlace, selectedBlock])

    const handleChangePlace = event => {
        setSelectedPlace(event.target.value);
    }

    const handleChangeBlock = event => {
        setSelectedBlock(event.target.value);
    }

    return (
        <div className={classes.root}>
            <Title text="Kayıtlı Yer Listesi" />
            <SelectPlace selectedPlace={selectedPlace} handleChange={handleChangePlace} />
            {selectedPlace && <SelectBlock selectedBlock={selectedBlock} handleChange={handleChangeBlock} placeId={selectedPlace}/>}
            <TableDoor />
        </div>
    )
}