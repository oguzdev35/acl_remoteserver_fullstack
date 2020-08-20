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
import { useStore, useDispatch } from 'react-redux';

import { updateDepartment } from '../../../../../../../store/actions/department.action';

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
    {varName: 'name', id: 0, label: 'Departman İsmi'},
];

export default props => {

    const { departmentId } = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const globalState = useStore().getState();


    const getInitialValues = (_globalState) => {
        let newInitialValues = {};

        console.log(departmentId)

        const department = _globalState.departments.find(({_id}) => _id == departmentId);

        formElements.forEach( elem => {
            newInitialValues[`${elem.varName}`] = department[`${elem.varName}`]
        });

        return newInitialValues
    }


    const formik = useFormik({
        initialValues: getInitialValues(globalState),
        onSubmit: values => {
            const updatedDepartment = {
                name: values.name,
            };
            const placeId = globalState.places.find(({departments}) => departments.includes(departmentId))._id;
            const userId = globalState.user._id;
            dispatch(
                updateDepartment({updatedDepartment: updatedDepartment, userId: userId, placeId: placeId, departmentId: departmentId})
            );
            setOpen(false)
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
                Departman Bilgilerini Düzenle
            </Button>
            <Dialog
                fullWidth={true}
                maxWidth="sm"
                open={open}
                onClose={handleClose}
            >
                <form 
                    className={classes.form}
                    onSubmit={formik.handleSubmit}
                >
                    <DialogTitle id="department-info-edit">Departman Bilgilerini Düzenle</DialogTitle>
                    <DialogContent>

                            <TableContainer component={Paper}>
                                <Table>
                                    <TableBody>
                                        {formElements.map(({id, varName, label}) => {
                                            return (
                                                <TableRow key={id}>
                                                    <TableCell
                                                        style={{width: '10vw'}}
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
                                                            variant="outlined"
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
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit">
                            Kaydet
                        </Button>
                        <Button onClick={handleClose}>
                            Kapat
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    )
}