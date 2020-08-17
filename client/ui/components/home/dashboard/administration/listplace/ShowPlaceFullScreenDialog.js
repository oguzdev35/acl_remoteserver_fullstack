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
    {varName: 'name', id: 0, type: 'text', label: 'Yer Adı'},
    {varName: 'address', id: 1, type: 'text', label: 'Adres'}, 
];

const Transition = React.forwardRef( (props, ref) => (
    <Slide direction="up" ref={ref} {...props} />
));


export default (props) => {

    const { handleClose, open, placeId } = props;
    const classes = useStyles();
    const place = useSelector( state => state.places.find( ({_id}) => _id == placeId ));

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
                                                    <Typography>{label} : {place[`${varName}`]}</Typography>
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