import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import {
    Button, Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle, FormControl, FormControlLabel,
    InputLabel, MenuItem, Select, Switch,
    TableContainer, Table, TableBody, 
    TableRow, TextField,
    Typography, Paper
} from '@material-ui/core';
import MuiTableCell from "@material-ui/core/TableCell";
import { useStore, useDispatch } from 'react-redux';

import { updatePerson } from '../../../../../../../store/actions/person.action';

const TableCell = withStyles({
    root: {
      borderBottom: "none"
    }
  })(MuiTableCell);

const useStyles = makeStyles( (theme) => ({
    button: {
        margin: theme.spacing(1)
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 100
    },
    formControlLabel: {
        marginTop: theme.spacing(1)
    },
}));

const formElements = [
    {varName: 'personTagId', id: 0, label: 'PersonId'},
    {varName: 'firstName', id: 1, label: 'İsim'},
    {varName: 'lastName', id: 2, label: 'Soyisim'},
    {varName: 'phone1', id: 3, label: 'Telefon-1'},
    {varName: 'phone2', id: 4, label: 'Telefon-2'},
    {varName: 'address1', id: 5, label: 'Adres-1'},
    {varName: 'address2', id: 6, label: 'Adres-2'},
    {varName: 'email', id: 7, label: 'Email'},
];

export default props => {

    const { personId } = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const globalState = useStore().getState();


    const getInitialValues = (_globalState) => {
        let newInitialValues = {};

        const person = _globalState.persons.find(({_id}) => _id == personId);

        formElements.forEach( elem => {
            newInitialValues[`${elem.varName}`] = person[`${elem.varName}`]
        });

        return newInitialValues
    }


    const formik = useFormik({
        initialValues: getInitialValues(globalState),
        onSubmit: values => {
            const updatedPerson = {
                personTagId: values.personTagId,
                firstName: values.firstName,
                lastName: values.lastName,
                phone1: values.phone1,
                phone2: values.phone2,
                address1: values.address1,
                address2: values.address2,
                email: values.email
            };
            console.log(updatedPerson);
            const placeId = globalState.places.find(({persons}) => persons.includes(personId))._id;
            const userId = globalState.user._id;
            dispatch(
                updatePerson({updatedPerson: updatedPerson, userId: userId, placeId: placeId, personId: personId})
            );
            setOpen(false)
        }
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button
                variant="outlined"
                onClick={handleClickOpen}
            >
                Personel Bilgilerini Düzenle
            </Button>
            <Dialog
                fullWidth={true}
                maxWidth="md"
                open={open}
                onClose={handleClose}
            >
                <form 
                    className={classes.form}
                    onSubmit={formik.handleSubmit}
                >
                    <DialogTitle id="person-info-edit">Personel Bilgilerini Düzenle</DialogTitle>
                    <DialogContent>

                            <TableContainer component={Paper}>
                                <Table>
                                    <TableBody>
                                        {formElements.map(({id, varName, label}) => {
                                            return (
                                                <TableRow key={id}>
                                                    <TableCell
                                                        colSpan={10}
                                                        style={{width: '50vw'}}
                                                    >
                                                        <TextField
                                                            id={varName}
                                                            variant="outlined"
                                                            margin="dense"
                                                            label={label}
                                                            fullWidth
                                                            className={classes.form}
                                                            onChange={formik.handleChange}
                                                            value={formik.values[`${varName}`] || ''}
                                                            type={varName}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit">
                            Kaydet
                        </Button>
                        <Button onClick={handleClose}>
                            Kapat
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    )
}