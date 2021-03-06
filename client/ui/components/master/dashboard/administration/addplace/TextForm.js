import React from 'react';
import {
    TextField, TableCell
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    form: {
        marginTop: theme.spacing(0),
    },
}))

export default (props) => {
    const {label, required, varName, formik} = props;
    const classes = useStyles();
    return (
        <React.Fragment>
            <TableCell 
                colSpan={2}
            >
                <TextField 
                    id={varName}
                    variant="outlined"
                    label={label}
                    fullWidth
                    required={required}
                    className={classes.form}
                    onChange={formik.handleChange}
                    value={formik.values[`${varName}`] || ''}
                    type={varName}
                />  
            </TableCell>
        </React.Fragment>
    )
}
