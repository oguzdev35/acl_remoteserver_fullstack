import React from 'react';
import {
    Dialog, Slide
} from '@material-ui/core';
import { useSelector } from 'react-redux';

import Title from './Title';
import Content from './Content';


const Transition = React.forwardRef( (props, ref) => (
    <Slide direction="up" ref={ref} {...props} />
));


export default (props) => {

    const { handleClose, open, personId } = props;

    return (
        <React.Fragment>
                <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                    <Title
                        handleClose={handleClose}
                        text="Personel Bilgileri"
                        personId={personId}
                    />
                    <Content 
                        personId={personId}
                    />
                </Dialog>
        </React.Fragment>
    )
}