import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography, Table, TableBody, TableCell,
    TableContainer, TableRow, Paper
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    label: {
        margin: theme.spacing(1)
    },
    tablerow: {
        '&:hover': {
            cursor: 'default'
        }
    }
}))

const _labels = {
    personTagId: 'Personel ID',
    firstName: 'Ad',
    lastName: 'Soyad',
    email: 'Email',
    phone1: 'Ana Telefon Numarası',
    phone2: 'Yedek Telefon Numarası',
    address1: 'Ana Ikametgah Adresi',
    address2: 'Diğer Ikametgah Adresi',
    createdAt: 'Kayıt Tarihi'
}

export default props => {
    const { person } = props;
    const classes = useStyles();
    return (
        <TableContainer>
            <Table size="small">
                <TableBody>
                    {Object.entries(person).filter(item => item[0] != '_id' ).map((item, idx) => {
                        // return _labels[item[0]]
                        return (
                            <TableRow key={idx} hover className={classes.tablerow}>
                                <TableCell component="th" scope="row">
                                    {_labels[item[0]]}
                                </TableCell>
                                <TableCell align="right">{item[1]}</TableCell>
                            </TableRow>
                        )
                    })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}