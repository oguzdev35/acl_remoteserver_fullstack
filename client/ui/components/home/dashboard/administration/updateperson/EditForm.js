import React from 'react';
import { useFormik } from 'formik';
import {
    makeStyles
} from '@material-ui/core/styles';
import {
    Table, TableBody, TableContainer,
    Paper, TableRow
} from '@material-ui/core';

import TextForm from './TextForm';

const useStyles = makeStyles( (theme) => ({
    root: {
        margin: theme.spacing(2),
        minWidth: '70vw'
    },
    forms: {
        marginTop: theme.spacing(1)
    },
    formElement: {
        margin: theme.spacing(1)
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

export default (props) => {

    const { person, setUpdatedUser } = props; 

    const [initialValues, setInitialValues] = React.useState({
        personid: person.personId,
        firstname: person.firstName,
        lastname: person.lastName,
        phone1: person.phone1,
        phone2: person.phone2,
        address1: person.address1,
        address2: person.address2,
        email: person.email
    });
    const classes = useStyles();

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: values => {
            const updatedUser = {
                personId: values.personid,
                firstName: values.firstname,
                lastName: values.lastname,
                phone1: values.phone1,
                phone2: values.phone2,
                address1: values.address1,
                address2: values.address2,
                email: values.email
            };
        }
    });

    React.useEffect( () => {
        setUpdatedUser(formik.values);
    }, [formik.values]);



    return (
        <div className={classes.root}>
            <form 
                onSubmit={formik.handleSubmit}
                className={classes.forms}
            >
                <TableContainer component={Paper}>
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
                </TableContainer>
            </form>
        </div>
    )
}