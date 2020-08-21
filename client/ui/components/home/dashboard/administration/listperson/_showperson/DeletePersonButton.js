import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import { useDispatch, useSelector, useStore } from 'react-redux';

import { deletePerson } from '../../../../../../../store/actions/person.action';
import { listPlace } from '../../../../../../../store/actions/place.action';


export default function ResponsiveDialog(props) {

    const { personId } = props;

    const dispatch = useDispatch();

    const places = useSelector( state => state.places);
    const userId = useStore().getState().user._id;
    const [placeId, setPlaceId] = React.useState("");

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect( () => {
        dispatch(listPlace({
            userId: userId
        }))
    }, []);

    React.useEffect( () => {
        if(places){
            const _placeId = places.find(({persons}) => persons.includes(personId))._id;
            setPlaceId(_placeId);
        }
    }, [places]);

    const handleDeletion = () => {
        dispatch(deletePerson({
            userId: userId,
            placeId: placeId,
            personId: personId
        }))
    }

    return (
        <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Personeli Sil
        </Button>
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">{"Personel Silme"}</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Kayıtlı Personeli Silmek istediğinize eminmisiniz?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary"autoFocus>
                Hayır
            </Button>
            <Button onClick={handleDeletion} color="primary">
                Evet
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}