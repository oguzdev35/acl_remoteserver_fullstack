import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    TextField, TableCell
} from '@material-ui/core';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
}));

export default (props) => {

    const {
        label, required, varName, formik
    } = props;
    const classes = useStyles();

    const users = useSelector(state => state.users);

    const [items, setItems] = React.useState([]);
    const [selectedUser, setSelectedUser] = React.useState('');

    React.useEffect( () => {
        switch(varName){
            case 'users':
                setItems(users.map(({username}) => username));
                break;
            default:
                break;
        }
    }, [])

    React.useEffect( () => {
        if(selectedUser._id){
            formik.setFieldValue('userId', users.find(({username}) => username == selectedUser))
        }
    }, [selectedUser])

    const handleChange = event => {
        console.log(event.target.value)
        setSelectedUser(event.target.value);
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
                    value={selectedUser}
                    onChange={handleChange}
                    SelectProps={{
                        native: true,
                    }}
                    variant="outlined"
                >
                    {items.map((item) => (
                        <option key={item} value={item}>
                        {item}
                        </option>
                    ))}
                </TextField>
        </TableCell>
    );
}