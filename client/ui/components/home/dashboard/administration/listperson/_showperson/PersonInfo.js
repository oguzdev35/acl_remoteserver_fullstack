import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography, Table, TableBody, TableCell,
    TableContainer, TableRow, Paper
} from '@material-ui/core';

import { useStore, useDispatch, useSelector } from 'react-redux';

import { listPlace } from '../../../../../../../store/actions/place.action';

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
    const userId = useStore().getState().user._id;
    const places = useSelector( state => state.places );
    const [placeName, setPlaceName] = React.useState("");
    let _person = Object.assign({}, person);
    _person.departments = undefined;
    const classes = useStyles();
    const dispatch = useDispatch();
    
    React.useEffect( () => {
        dispatch(listPlace({
            userId: userId
        }))
    }, [])

    React.useEffect(() => {
        if(places){
            const _placeName = places.find(({persons}) => persons.includes(person._id)).name;
            setPlaceName(_placeName)
        }
    }, [places])

    return (
        <TableContainer>
            <Table size="small">
                <TableBody>
                    {Object.entries(_person).filter(item => item[0] != '_id' ).map((item, idx) => {
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
                    <TableRow hover className={classes.tablerow}>
                        <TableCell component="th" scope="row">
                            Çalıştığı Yer
                        </TableCell>
                        <TableCell align="right">{placeName}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}