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
import SelectFormPlace from './SelectFormPlace';
import SelectFormBlock  from './SelectFormBlock';

import { createDoor } from '../../../../../../store/actions/door.action';

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
    {varName: 'doorTagId', id: 0, type: 'text', label: 'Kapı Tag ID', required: true},
    {varName: 'name', id: 1, type: 'text', label: 'İsim', required: true},
    {varName: 'places', id: 2, type: 'selectplace', label: 'Bağlı Olduğu Yer', required: true, buttonText: 'Yer Seçiniz'},
    {varName: 'blocks', id: 3, type: 'selectblock', label: 'Bağlı Olduğu Blok', required: true, buttonText: 'Blok Seçiniz'},
    {varName: 'users', id: 4, type: 'disabled', required: false}
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
            const newDoor = {
                doorTagId: values.doorTagId,
                name: values.name,
            };
            const placeId = values.placeId;
            const userId = values.userId;
            const blockId = values.blockId;

            console.table(
                placeId, userId, blockId
            )
            dispatch(createDoor({newDoor: newDoor, blockId: blockId, placeId: placeId, userId: userId}));
            formik.setValues(initialValues);
        }
    });
    


    return (
        <div className={classes.root}>
            <Title text="Kapı Kayıt Formu" />
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
                                            type === 'selectplace' && <SelectFormPlace 
                                                label={label}
                                                required={required}
                                                varName={varName}
                                                formik={formik}
                                                buttonText={buttonText}
                                            />
                                        }
                                        {
                                            type === 'selectblock' && 
                                                formik.values.placeId && <SelectFormBlock 
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