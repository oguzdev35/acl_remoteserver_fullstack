import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import {
    Button, Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle, FormControl, FormControlLabel,
    InputLabel, MenuItem, Select, Switch,
    TableContainer, Table, TableBody, 
    TableRow, TextField,
    Typography, Paper
} from '@material-ui/core';
import MuiTableCell from "@material-ui/core/TableCell";

const TableCell = withStyles({
    root: {
      borderBottom: "none"
    }
  })(MuiTableCell);

const useStyles = makeStyles( (theme) => ({
    button: {
        margin: theme.spacing(1)
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content'
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 100
    },
    formControlLabel: {
        marginTop: theme.spacing(1)
    },
    label: {
        display: 'inline',
        width: '5vw',
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(1),
    },
}));

const formElements = [
    {varName: 'personTagId', id: 0, label: 'PersonId'},
    {varName: 'firstName', id: 1, label: 'İsim'},
    {varName: 'lastName', id: 2, label: 'Soyisim'},
    {varName: 'phone1', id: 3, label: 'Telefon-1'},
    {varName: 'phone2', id: 4, label: 'Telefon-2'},
    {varName: 'address1', id: 5, label: 'Adres-1'},
    {varName: 'address2', id: 6, label: 'Adres-2'},
    {varName: 'email', id: 7, label: 'Email'},
];

export default props => {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [initialValues, setInitialValues] = React.useState({});

    const resetInitialValues = () => {
        let newInitialValues = {};

        formElements.forEach( elem => {
            newInitialValues[`${elem.varName}`]
        });

        setInitialValues(newInitialValues);
    }

    React.useEffect( () => {
        resetInitialValues()
    }, [])

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
            console.log(updatedPerson);
        }
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button
                variant="outlined"
                onClick={handleClickOpen}
            >
                Personel Bilgilerini Düzenle
            </Button>
            <Dialog
                fullWidth={true}
                maxWidth="sm"
                open={open}
                onClose={handleClose}
            >
                <DialogTitle id="person-info-edit">Personel Bilgilerini Düzenle</DialogTitle>
                <DialogContent>
                    <form 
                        className={classes.form}
                        onSubmit={formik.handleSubmit}
                    >
                        <TableContainer component={Paper}>
                            <Table>
                                <TableBody>
                                    {formElements.map(({id, varName, type, label}) => {
                                        return (
                                            <TableRow key={id}>
                                                <TableCell
                                                    style={{width: '8vw'}}
                                                    align="left"
                                                >
                                                    <Typography className={classes.label}>
                                                        {label} :
                                                    </Typography>
                                                </TableCell>
                                                <TableCell
                                                    colSpan={4}
                                                    // style={{width: '50vw'}}
                                                >
                                                    <TextField
                                                        id={varName}
                                                        variant="standard"
                                                        margin="dense"
                                                        fullWidth
                                                        className={classes.form}
                                                        onChange={formik.handleChange}
                                                        value={formik.values[`${varName}`] || ''}
                                                        type={varName}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Kaydet
                    </Button>
                    <Button onClick={handleClose}>
                        Kapat
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}