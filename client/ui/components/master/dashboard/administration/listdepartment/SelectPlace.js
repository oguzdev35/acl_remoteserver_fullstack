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
    const places = useSelector( state => state.places);
    const { handleChange, selectedPlace } = props;
    const classes = useStyles();


    return (
        <React.Fragment>
            <FormControl className={classes.formControl} fullWidth>
                <InputLabel id="place-department-select-helper-label">
                    Yer adı
                </InputLabel>
                <Select
                    labelId="place-department-select-helper-label"
                    id="place-department-select-helper"
                    value={selectedPlace}
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>Seçiniz</em>
                    </MenuItem>
                    {
                        places.map( place => (
                            <MenuItem key={place._id} value={place._id}>
                                {place.name}
                            </MenuItem>
                        ))
                    }
                </Select>
                <FormHelperText>Yer adı seçiniz</FormHelperText>
            </FormControl>
        </React.Fragment>
    )
}