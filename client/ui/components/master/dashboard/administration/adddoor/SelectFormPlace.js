import React from 'react';
import {
    TextField, TableCell
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import { listBlock } from '../../../../../../store/actions/block.action';


export default (props) => {

    const {
        label, required, varName, formik
    } = props;

    const dispatch = useDispatch();

    const places = useSelector(state => state.places);
    const users = useSelector(state => state.users);


    const [items, setItems] = React.useState([]);
    const [selectedPlace, setSelectedPlace] = React.useState('');

    React.useEffect( () => {
        switch(varName){
            case 'places':
                setItems(places.map(({name}) => name));
                break;
            default:
                break;
        }
    }, [places]);

    React.useEffect( () => {
        if(selectedPlace){
            let placeId = places.find(({name}) => name == selectedPlace)._id;
            let userId = users.find(({places}) => places.includes(placeId))._id;
            formik.setFieldValue('placeId', placeId);
            formik.setFieldValue('userId', userId);
            dispatch(listBlock({placeId: placeId, userId: userId}))
        }
        
    }, [selectedPlace]);

    const handleChange = event => {
        setSelectedPlace(event.target.value);
    }

    return (
        <TableCell 
            style={{width: '16vw'}}
            align="right"
        >
                <TextField
                    id="outlined-select-currency-native"
                    select
                    label={label}
                    required={required}
                    fullWidth
                    value={selectedPlace}
                    onChange={handleChange}
                    SelectProps={{
                        native: true,
                    }}
                    variant="outlined"
                >
                    <option value="">
                        
                    </option>
                    {items.map((item) => (
                        <option key={item} value={item}>
                        {item}
                        </option>
                    ))}
                </TextField>
        </TableCell>
    );
}