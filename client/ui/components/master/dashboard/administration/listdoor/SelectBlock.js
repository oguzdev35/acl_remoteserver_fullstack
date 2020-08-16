import React from 'react';
import {
    makeStyles
} from '@material-ui/core/styles';
import {
    InputLabel, MenuItem, FormHelperText,
    FormControl, Select
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import { listBlock } from '../../../../../../store/actions/block.action';

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

    const { handleChange, selectedBlock, placeId } = props;
    const dispatch = useDispatch();

    const blockIdList = (useSelector( state => state.places) || []).find(({_id}) => _id == placeId).blocks;
    const blocks = (useSelector( state => state.blocks) || []).filter(({_id}) => blockIdList.includes(_id));
    const userId = (useSelector( state => state.users) || []).find(({places}) => places.includes(placeId))._id;

    console.log(blockIdList)
    console.log(blocks)

    const classes = useStyles();

    React.useState( () => {
        if(userId)
            dispatch(listBlock({placeId: placeId, userId: userId}));
    }, [userId])


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