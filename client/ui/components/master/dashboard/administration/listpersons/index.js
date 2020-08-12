import React from 'react';
import {
    makeStyles
} from '@material-ui/core/styles';

import Title from './Title';
import TablePerson from './TablePerson';

const useStyles = makeStyles( (theme) => ({
    root: {
        margin: theme.spacing(2),
        minWidth: '70vw'
    }
}));

export default (props) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Title text="Kayıtlı Personel Listesi" />
            <TablePerson />
        </div>
    )
}