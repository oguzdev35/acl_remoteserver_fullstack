import React from 'react';
import {
    makeStyles
} from '@material-ui/core/styles';
import {
    InputLabel, MenuItem, FormHelperText,
    FormControl, Select
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import { listBlock,  } from '../../../../../../store/actions/block.action';
import { listPlace } from '../../../../../../store/actions/place.action';

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

    const { handleChange, selectedBlock } = props;

    const blocks = useSelector( state => state.blocks);

    const classes = useStyles();


    return (
        <React.Fragment>
            <FormControl className={classes.formControl} fullWidth>
                <InputLabel id="place-person-select-helper-label">
                    Blok adı
                </InputLabel>
                <Select
                    labelId="place-block-select-helper-label"
                    id="place-block-select-helper"
                    value={selectedBlock}
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>Seçiniz</em>
                    </MenuItem>
                    {
                        blocks.map( block => (
                            <MenuItem key={block._id} value={block._id}>
                                {block.name}
                            </MenuItem>
                        ))
                    }
                </Select>
                <FormHelperText>Blok adı seçiniz</FormHelperText>
            </FormControl>
        </React.Fragment>
    )
}