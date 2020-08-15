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
    {varName: 'name', id: 0, type: 'text', label: 'Blok Adı'},
];

const Transition = React.forwardRef( (props, ref) => (
    <Slide direction="up" ref={ref} {...props} />
));


export default (props) => {

    const { handleClose, open, handleUpdate, blockId } = props;
    const classes = useStyles();
    const block = useSelector( state => state.blocks.find( ({_id}) => _id == blockId ));

    const initialValues = {
        name: block.name,
    };

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: values => {
            handleUpdate({
                name: values.name
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
                                    Blok Kayıt Düzenleme
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