import React from 'react';
import {
    TextField, TableCell
} from '@material-ui/core';
import { useSelector } from 'react-redux';



export default (props) => {

    const {
        label, required, varName, formik
    } = props;

    const blocks = useSelector(state => state.blocks);
    const places = useSelector(state => state.places);


    const [items, setItems] = React.useState([]);
    const [selectedBlock, setSelectedBlock] = React.useState('');

    React.useEffect( () => {
        switch(varName){
            case 'blocks':
                const blockIdList = places.find(({_id}) => _id == formik.getFieldProps('placeId').value).blocks
                setItems(blocks.filter(({_id}) => blockIdList.includes(_id)).map(({name}) => name));
                break;
            default:
                break;
        }
    }, [places, blocks]);

    React.useEffect( () => {
        if(selectedBlock){
            let blockId = blocks.find(({name}) => name == selectedBlock)._id;
            formik.setFieldValue('blockId', blockId);
        }
        
    }, [selectedBlock]);

    const handleChange = event => {
        setSelectedBlock(event.target.value);
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
                    value={selectedBlock}
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