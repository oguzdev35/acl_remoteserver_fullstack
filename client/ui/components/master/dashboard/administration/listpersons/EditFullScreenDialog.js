import React from 'react';
import { useFormik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button, Dialog, AppBar,Toolbar, IconButton,
    Typography, Slide, Table, TableRow,
    TableContainer, Paper, TableBody
} from '@material-ui/core';
import {
    Close as CloseIcon,
} from '@material-ui/icons';

import { useSelector } from 'react-redux';

import TextForm from './TextForm';


const useStyles = makeStyles((theme) => ({
    formMain: {
        margin: theme.spacing(2),
        minWidth: '70vw'
    },
    forms: {
        marginTop: theme.spacing(1)
    },
    formElement: {
        margin: theme.spacing(1)
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1
    }
}));

const formElements = [
    {varName: 'personid', id: 0, type: 'text', label: 'Personel ID', required: true},
    {varName: 'firstname', id: 1, type: 'text', label: 'İsim', required: true}, 
    {varName: 'lastname', id: 2, type: 'text', label: 'Soyisim', required: true}, 
    {varName: 'email', id: 3, type: 'text', label: 'Email Adresi'}, 
    {varName: 'phone1', id: 4, type: 'text', label: 'Telefon numarası(1)', required: true}, 
    {varName: 'phone2', id: 5, type: 'text', label: 'Telefon numarası(2)'}, 
    {varName: 'address1', id: 6, type: 'text', label: 'Adres(1)', required: true}, 
    {varName: 'address2', id: 7, type: 'text', label: 'Adres(2)'}, 
];

const Transition = React.forwardRef( (props, ref) => (
    <Slide direction="up" ref={ref} {...props} />
));


export default (props) => {

    const { handleClose, open, handleUpdate, personId } = props;
    const classes = useStyles();
    const person = useSelector( state => state.persons.find( ({_id}) => _id == personId ));

    const initialValues = {
        personid: person.personId,
        firstname: person.firstName,
        lastname: person.lastName,
        phone1: person.phone1,
        phone2: person.phone2,
        address1: person.address1,
        address2: person.address2,
        email: person.email
    };

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: values => {
            handleUpdate({
                personId: values.personid,
                firstName: values.firstname,
                lastName: values.lastname,
                phone1: values.phone1,
                phone2: values.phone2,
                address1: values.address1,
                address2: values.address2,
                email: values.email
            });
        }
    });

    return (
        <React.Fragment>

                <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                    <form
                        onSubmit={formik.handleSubmit}
                    >
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                                <IconButton edge="start" color="inherit" onClick={handleClose}>
                                    <CloseIcon />
                                </IconButton>
                                <Typography variant="h6" className={classes.title}>
                                    Personel Kayıt Düzenleme
                                </Typography>
                                <Button autoFocus color="inherit" type="submit">
                                    Kaydet
                                </Button>
                            </Toolbar>
                        </AppBar>
                        <TableContainer componet={Paper}>
                            <div className={classes.forms}>
                                <Table>
                                    <TableBody>
                                    {formElements.map(({id, varName, type, label, required}) => {
                                        return (
                                            <TableRow key={id}>
                                                { type === 'text' && <TextForm 
                                                    label={label} 
                                                    required={required} 
                                                    varName={varName} 
                                                    formik={formik}
                                                    />}
                                            </TableRow>
                                        )
                                    })}
                                    </TableBody>
                                </Table>
                            </div>
                        </TableContainer>
                    </form>
                </Dialog>
        </React.Fragment>
    )
}