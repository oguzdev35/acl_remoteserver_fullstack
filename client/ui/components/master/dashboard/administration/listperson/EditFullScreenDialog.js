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
    {varName: 'personTagId', id: 0, type: 'text', label: 'PersonId'},
    {varName: 'firstName', id: 1, type: 'text', label: 'İsim'},
    {varName: 'lastName', id: 2, type: 'text', label: 'Soyisim'},
    {varName: 'phone1', id: 3, type: 'text', label: 'Telefon-1'},
    {varName: 'phone2', id: 4, type: 'text', label: 'Telefon-2'},
    {varName: 'address1', id: 5, type: 'text', label: 'Adres-1'},
    {varName: 'address2', id: 6, type: 'text', label: 'Adres-2'},
    {varName: 'email', id: 7, type: 'text', label: 'Email'}
];

const Transition = React.forwardRef( (props, ref) => (
    <Slide direction="up" ref={ref} {...props} />
));


export default (props) => {

    const { handleClose, open, handleUpdate, personId } = props;
    const [initialValues, setInitialValues] = React.useState({});
    const classes = useStyles();
    const person = useSelector( state => state.blocks.find( ({_id}) => _id == personId ));

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
            handleUpdate(updatedPerson);
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