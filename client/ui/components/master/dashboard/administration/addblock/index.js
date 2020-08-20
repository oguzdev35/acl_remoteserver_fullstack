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

import { createBlock } from '../../../../../../store/actions/block.action';

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
    {varName: 'name', id: 0, type: 'text', label: 'Blok Adı', required: true},
    {varName: 'places', id: 1, type: 'select', label: 'Bağlı Olduğu Yer', required: true, buttonText: 'Yer Seçiniz'},
    {varName: 'users', id: 2, type: 'disabled', required: false}
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
            const newBlock = {
                name: values.name
            };
            const placeId = values.placeId;
            const userId = values.userId;
            dispatch(createBlock({newBlock: newBlock, placeId: placeId, userId: userId}));
            formik.setValues(initialValues);
        }
    });


    return (
        <div className={classes.root}>
            <Title text="Blok Kayıt Formu" />
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