import React from 'react';
import {
    TableCell, Typography, TextField,
    Button, Dialog, DialogActions, 
    DialogContent, DialogTitle, 
    InputLabel, Input, MenuItem, FormControl,
    Select
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';

import { listPlace } from '../../../../../../store/actions/place.action';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
    },
    dialog: {
        minWidth: '40vw'
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
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    }
}));

export default (props) => {

    const userId = useSelector(state => state.user._id);
    const places = useSelector(state => state.places);
    const users = useSelector(state => state.users);

    const {
        label, required, varName, formik, buttonText
    } = props;
    const classes = useStyles();


    const [dialog, setDialog] = React.useState(false);
    const [items, setItems] = React.useState([]);
    const [selectedPlace, setSelectedPlace] = React.useState({
        _id: '', name: ''
    });

    React.useEffect( () => {
        switch(varName){
            case 'places':
                setItems(places.map(({_id, name}) => {
                    return {
                        _id, name
                    }
                }));
        }
    }, [places])

    React.useEffect( () => {
        if(selectedPlace._id){
            formik.setFieldValue('placeId', selectedPlace._id)
            formik.setFieldValue('userId', users.find(({places}) => places.includes(selectedPlace._id))._id);
        }
        console.log(selectedPlace)
    }, [selectedPlace])


    const handleChangeText = event => {
        setSelectedPlace(
            items.find(({name}) => name == event.target.value) || {name: event.target.value, _id: ''}
        )
    };

    const handleChangeSelect = event => {
        setSelectedPlace(event.target.value || {name: '', _id: ''});
    }

    const handleClickOpen = () => {
        setDialog(true);
    };

    const handleClose = () => {
        setDialog(false);
    };

    return (
    <React.Fragment>
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
                onChange={handleChangeText}
                value={selectedPlace.name || ""}
                type={varName}
            />  
        </TableCell>
        <TableCell colSpan={3}>
            <Button onClick={handleClickOpen}>{buttonText}</Button>
            <Dialog 
                disableBackdropClick 
                disableEscapeKeyDown 
                open={dialog}
                onClose={handleClose}
                className={classes.dialog}
            >
                <DialogTitle>Yer Seçiniz</DialogTitle>
                <DialogContent className={classes.dialog}>
                    <form className={classes.container}>
                        <FormControl className={classes.formControl} fullWidth>
                            <InputLabel htmlFor="place-dialog-non-native-label">Yer</InputLabel>
                            <Select
                                labelId="place-dialog-non-native-label"
                                id="place-dialog-non-native"
                                value={selectedPlace}
                                onChange={handleChangeSelect}
                                input={<Input />}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {items.length != 0 && items.map((item) => {
                                        return (
                                            <MenuItem 
                                                key={item._id}
                                                value={item}
                                            >{item.name}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                    </form>
                </DialogContent>
                <Button onClick={handleClose} color="primary" >
                    Vazgeç
                </Button>
                <Button onClick={handleClose} color="primary"  >
                    Seç
                </Button>
            </Dialog>
            { required && <Typography className={classes.help}>
                * gerekli
            </Typography>}
        </TableCell>
    </React.Fragment>
    )
}