import React from 'react';
import {
    Dialog, Slide
} from '@material-ui/core';

import Title from './Title';
import Content from './Content';


const Transition = React.forwardRef( (props, ref) => (
    <Slide direction="up" ref={ref} {...props} />
));


export default (props) => {

    const { handleClose, open, departmentId } = props;

    return (
        <React.Fragment>
                <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                    <Title
                        handleClose={handleClose}
                        text="Departman Bilgileri"
                        departmentId={departmentId}
                    />
                    <Content 
                        departmentId={departmentId}
                    />
                </Dialog>
        </React.Fragment>
    )
}