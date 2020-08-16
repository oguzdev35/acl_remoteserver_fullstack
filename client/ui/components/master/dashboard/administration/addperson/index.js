import React from 'react';
import { useFormik } from 'formik';
import {
    makeStyles
} from '@material-ui/core/styles';
import {
    Table, TableBody, TableContainer,
    Paper, TableRow, Button
} from '@material-ui/core';
import {
    useDispatch
} from 'react-redux';

import Title from './Title';
import TextForm from './TextForm';
import SelectForm from './SelectForm';

import { createPerson } from '../../../../../../store/actions/person.action';

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
    {varName: 'personTagId', id: 0, type: 'text', label: 'PersonId', required: true},
    {varName: 'firstName', id: 1, type: 'text', label: 'İsim', required: true},
    {varName: 'lastName', id: 2, type: 'text', label: 'Soyisim', required: true},
    {varName: 'phone1', id: 3, type: 'text', label: 'Telefon-1', required: true},
    {varName: 'phone2', id: 4, type: 'text', label: 'Telefon-2', required: true},
    {varName: 'address1', id: 5, type: 'text', label: 'Adres-1', required: true},
    {varName: 'address2', id: 6, type: 'text', label: 'Adres-2', required: true},
    {varName: 'email', id: 7, type: 'text', label: 'Email', required: true},
    {varName: 'places', id: 8, type: 'select', label: 'Bağlı Olduğu Yer', required: true, buttonText: 'Yer Seçiniz'},
    {varName: 'users', id: 9, type: 'disabled', required: false}
];

export default () => {

    const [initialValues, setInitialValues] = React.useState({});
    const classes = useStyles();
    const dispatch = useDispatch();

    const resetInitialValues = () => {
        let newInitialValues = {};

        formElements.forEach( elem => {
            switch(elem.type){
                case 'text':
                case 'disabled':
                case 'select':
                    newInitialValues[`${elem.varName}`] = '';
                    break;
                default:
                    break;
            }
        });
        setInitialValues(newInitialValues);
    }

    React.useEffect( () => {
        resetInitialValues();
    }, []);



    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: values => {
            const newPerson = {
                personTagId: values.personTagId,
                firstName: values.firstName,
                lastName: values.lastName,
                phone1: values.phone1,
                phone2: values.phone2,
                address1: values.address1,
                address2: values.address2,
                email: values.email
            };
            console.log(initialValues)
            const placeId = values.placeId;
            const userId = values.userId;
            console.log(values)
            dispatch(createPerson({newPerson: newPerson, placeId: placeId, userId: userId}));
            formik.setValues(initialValues);
        }
    });


    return (
        <div className={classes.root}>
            <Title text="Personel Kayıt Formu" />
            <form 
                onSubmit={formik.handleSubmit}
                className={classes.forms}
            >
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            {formElements.map(({id, varName, type, label, required, buttonText}) => {
                                return (
                                    <TableRow key={id}>
                                        { type === 'text' && <TextForm 
                                            label={label} 
                                            required={required} 
                                            varName={varName} 
                                            formik={formik}
                                            />}
                                        {
                                            type === 'select' && <SelectForm 
                                                label={label}
                                                required={required}
                                                varName={varName}
                                                formik={formik}
                                                buttonText={buttonText}
                                            />
                                        }
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button 
                    type="submit"
                    variant="contained" color="primary"
                    className={classes.formElement}
                    style={{float: "right"}}
                >
                    Kayıt Yapınız
                </Button>
            </form>
        </div>
    )
}