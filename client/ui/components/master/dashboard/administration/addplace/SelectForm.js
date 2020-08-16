import React from 'react';
import {
    TableCell, Typography, TextField,
    Button, Dialog, DialogActions, 
    DialogContent, DialogTitle, 
    InputLabel, Input, MenuItem, FormControl,
    Select
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

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

    const users = useSelector(state => state.users);

    const {
        label, required, varName, formik, buttonText
    } = props;
    const classes = useStyles();


    const [dialog, setDialog] = React.useState(false);
    const [items, setItems] = React.useState([]);
    const [selectedUser, setSelectedUser] = React.useState('');


    React.useEffect( () => {
        switch(varName){
            case 'users':

                setItems(users.map(({_id, username}) => {
                    return {
                        _id, username
                    }
                }));
        }
    }, [])

    React.useEffect( () => {
        if(selectedUser._id){
            formik.setFieldValue('userId', selectedUser._id)
        }
    }, [selectedUser])

    const handleChangeText = event => {
        setSelectedUser(
            items.find(({username}) => username == event.target.value) || {username: event.target.value, _id: ''}
        )
    };

    const handleChangeSelect = event => {
        setSelectedUser(event.target.value || {username: '', _id: ''});
    }

    const handleClickOpen = () => {
        setDialog(true);
    };

    const handleClose = () => {
        setDialog(false);
    };

    return <React.Fragment>
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
                    value={selectedUser.username || ""}
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
                    <DialogTitle>Kullanıcı Seçiniz</DialogTitle>
                    <DialogContent className={classes.dialog}>
                        <form className={classes.container}>
                            <FormControl className={classes.formControl} fullWidth>
                                <InputLabel htmlFor="user-dialog-non-native-label">Kullanıcı</InputLabel>
                                <Select
                                    labelId="user-dialog-non-native-label"
                                    id="user-dialog-non-native"
                                    value={selectedUser}
                                    onChange={handleChangeSelect}
                                    input={<Input />}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {items.map((item) => {
                                            return (
                                                <MenuItem 
                                                    key={item._id}
                                                    value={item}
                                                >{item.username}</MenuItem>
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
    </React.Fragment>
}