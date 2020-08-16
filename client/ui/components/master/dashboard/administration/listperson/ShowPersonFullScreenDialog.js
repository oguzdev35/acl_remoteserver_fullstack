import React from 'react';
import { useFormik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button, Dialog, AppBar,Toolbar, IconButton,
    Typography, Slide, Box, Paper
} from '@material-ui/core';
import {
    Close as CloseIcon,
} from '@material-ui/icons';

import { useSelector } from 'react-redux';



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

    const { handleClose, open, personId } = props;
    const classes = useStyles();
    const person = useSelector( state => state.persons.find( ({_id}) => _id == personId ));

    return (
        <React.Fragment>

                <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                Yer Bilgileri
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Box componet={Paper}>
                        <div className={classes.forms}>
                                {formElements.map(({id, varName, type, label, required}) => {
                                    return (
                                        <div key={id}>
                                            { type === 'text' && 

                                                <>
                                                    <Typography>{label} : {person[`${varName}`]}</Typography>
                                                </>

                                            }
                                        </div>
                                    )
                                })}
                        </div>
                    </Box>
                </Dialog>
        </React.Fragment>
    )
}