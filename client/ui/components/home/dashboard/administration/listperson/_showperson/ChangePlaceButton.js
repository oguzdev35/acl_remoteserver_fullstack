import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button
} from '@material-ui/core';

const useStyles = makeStyles( (theme) => ({
    button: {
        margin: theme.spacing(1)
    }
}));

export default props => {

    return (
        <React.Fragment>
            <Button
                variant="outlined"
            >
                Personel Bulunduğu Yeri Değiştir
            </Button>
        </React.Fragment>
    )
}