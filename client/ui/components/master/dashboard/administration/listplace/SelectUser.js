import React from 'react';
import {
    makeStyles
} from '@material-ui/core/styles';
import {
    InputLabel, MenuItem, FormHelperText,
    FormControl, Select
} from '@material-ui/core';
import { useSelector } from 'react-redux';


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      width: '30vw',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

export default props => {
    const users = useSelector( state => state.users);
    const [items, setItems] = React.useState([{}]);
    const { handleChange, selectedUser } = props;
    const classes = useStyles();

    React.useEffect( () => {
        setItems(users.map(({_id, username}) => {
            return {
                _id, username
            }
        }))
    }, [users]);

    return (
        <React.Fragment>
            <FormControl className={classes.formControl} fullWidth>
                <InputLabel id="username-place-select-helper-label">
                    Kullanıcı adı
                </InputLabel>
                <Select
                    labelId="username-place-select-helper-label"
                    id="username-place-select-helper"
                    value={selectedUser}
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>Seçiniz</em>
                    </MenuItem>
                    {
                        items.map( item => (
                            <MenuItem key={item._id} value={item}>
                                {item.username}
                            </MenuItem>
                        ))
                    }
                </Select>
                <FormHelperText>Kullanıcı adı seçiniz</FormHelperText>
            </FormControl>
        </React.Fragment>
    )
}