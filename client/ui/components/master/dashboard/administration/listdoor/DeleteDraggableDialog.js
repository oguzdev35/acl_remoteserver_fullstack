import React from 'react';
import {
    Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle,
    Paper, Button
} from '@material-ui/core';
import Draggable from 'react-draggable';

const PaperComponent = props => (
    <Draggable
        handle="#delete-door-dialog"
    >
        <Paper {...props} />
    </Draggable>
);


export default (props) => {

    const { handleClose, open, handleDeletion } = props;
    
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
            >
                <DialogTitle style={{ cursor: 'move' }} id="delete-door-dialog">
                    Blok Sil
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Kapı bilgileri kalıcı olarak silinecektir. İşleme devam etmek istiyor musunuz?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Vazgeç
                    </Button>
                    <Button onClick={handleDeletion} color="primary">
                        Sil
                    </Button>        
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )


}