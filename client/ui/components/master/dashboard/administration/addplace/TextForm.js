import React from 'react';
import {
    TextField, Typography, TableCell
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
    },
    label: {
        display: 'inline',
        width: '30vw',
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(1),
    },
    form: {
        display: 'inline',
    },
    help: {
        display: 'inline',
        marginLeft: theme.spacing(1)
    },
}))

export default (props) => {
    const {label, required, varName, formik} = props;
    const classes = useStyles();
    return (
        <>
            <TableCell 
                style={{width: '16vw'}}
                align="right"
            >
                <Typography className={classes.label}>
                    {label} :
                </Typography>
            </TableCell>
            <TableCell 
                colSpan={2}
                style={{width: '40w'}}
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
            <TableCell colSpan={3}>
                { required && <Typography className={classes.help}>
                    * gerekli
                </Typography>}
            </TableCell>
        </>
    )
}
