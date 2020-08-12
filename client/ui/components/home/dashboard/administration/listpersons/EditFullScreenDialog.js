import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button, Dialog, AppBar,Toolbar, IconButton,
    Typography, Slide
} from '@material-ui/core';
import {
    Close as CloseIcon,
} from '@material-ui/icons';

import { useSelector } from 'react-redux';

import EditForm from '../updateperson/EditForm';


const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1
    }
}));

const Transition = React.forwardRef( (props, ref) => (
    <Slide direction="up" ref={ref} {...props} />
));


export default (props) => {

    const { handleClose, open, handleUpdate, personId } = props;
    const classes = useStyles();
    const [updatedUser, setUpdatedUser] = React.useState({});
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
                            Personel Kayıt Düzenleme
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleUpdate(updatedUser)}>
                            Kaydet
                        </Button>
                    </Toolbar>
                </AppBar>
                <EditForm person={person} setUpdatedUser={setUpdatedUser} />
            </Dialog>
        </React.Fragment>
    )
}