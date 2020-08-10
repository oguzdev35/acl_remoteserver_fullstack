import React from 'react';
import { useFormik } from 'formik';
import {
    makeStyles
} from '@material-ui/core/styles';
import {
    Table, TableBody, TableContainer,
    Paper, TableRow, Button
} from '@material-ui/core'

import Title from './Title';
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
    {varName: 'firstname', id: 0, type: 'text', label: 'İsim', required: true}, 
    {varName: 'lastname', id: 1, type: 'text', label: 'Soyisim', required: true}, 
    {varName: 'email', id: 2, type: 'text', label: 'Email Adresi'}, 
    {varName: 'tel1', id: 3, type: 'text', label: 'Telefon numarası(1)', required: true}, 
    {varName: 'tel2', id: 4, type: 'text', label: 'Telefon numarası(2)'}, 
    {varName: 'address1', id: 5, type: 'text', label: 'Adres(1)', required: true}, 
    {varName: 'address2', id: 6, type: 'text', label: 'Adres(2)'}, 
];

export default () => {

    const [initialValues, setInitialValues] = React.useState({});
    const classes = useStyles();

    React.useEffect( () => {
        let newInitialValues = {};

        formElements.forEach( elem => {
            switch(elem.type){
                case 'text':
                    newInitialValues[`${elem.varName}`] = '';
                    break;
                default:
                    break;
            }
        });

        console.log(newInitialValues)

        setInitialValues(newInitialValues);

    }, []);



    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: values => {
            console.log(values)
        }
    });



    return (
        <div className={classes.root}>
            <Title text={"Üye Kayıt Formu"} />
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
                <Button 
                    type="submit"
                    variant="contained" color="primary"
                    className={classes.formElement}
                >
                    Giriş yapınız
                </Button>
            </form>
        </div>
    )
}