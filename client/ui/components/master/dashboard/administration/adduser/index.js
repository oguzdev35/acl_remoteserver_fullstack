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

import { createUser } from '../../../../../../store/actions/users.action';

const useStyles = makeStyles( (theme) => ({
    root: {
        margin: theme.spacing(2),
        minWidth: '30vw'
    },
    forms: {
        marginTop: theme.spacing(1)
    },
    formElement: {
        margin: theme.spacing(1)
    }
}));

const formElements = [
    {varName: 'username', id: 0, type: 'text', label: 'Kullanıcı Adı', required: true},
    {varName: 'password', id: 1, type: 'text', label: 'Şifre', required: true}, 
    {varName: 'email', id: 3, type: 'text', label: 'Email Adresi', required: true}, 
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
            const newUser = {
                username: values.username,
                password: values.password,
                email: values.email
            };
            dispatch(createUser(newUser));
            formik.setValues(initialValues);
        }
    });


    return (
        <div className={classes.root}>
            <Title text="Kullanıcı Kayıt Formu" />
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
                    style={{float: "right"}}
                >
                    Kayıt Yapınız
                </Button>
            </form>
        </div>
    )
}