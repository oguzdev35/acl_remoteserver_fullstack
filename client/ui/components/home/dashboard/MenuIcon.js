import React from 'react';
import {
    ClickAwayListener,
    Grow, Paper, Popper, MenuItem,
    MenuList, IconButton
} from '@material-ui/core';
import {
    AccountCircle as AccountIcon
} from '@material-ui/icons'
import {
    makeStyles
} from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';

import { logoutUser } from '../../../../store/actions/user.action';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    }
}))

export default (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const dispatch = useDispatch();

    const handleToggle = () => {
        setOpen( state => !state);
    };

    const handleClose = (event) => {
        if(anchorRef.current && anchorRef.current.contains(event.target))
            return;
        
        setOpen(false);
    };

    const handleLogout = (event) => {

        dispatch(logoutUser());

        handleClose(event);
    }

    const handleListKeyDown = (event) => {
        if(event.key === 'Tab'){
            event.preventDefault();
            setOpen(false);
        }
    };

    const prevOpen = React.useRef(open);

    React.useEffect( () => {

        
        if(prevOpen.current === true && open === false){
            anchorRef.current = open;
        }
    }, [open]);

    return (
        <div className={classes.root}>
            <IconButton
                size="medium"
                ref={anchorRef}
                onClick={handleToggle}
            >
                <AccountIcon  fontSize="large"/>
            </IconButton>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    <MenuItem onClick={handleClose}>Profilim</MenuItem>
                                    <MenuItem onClick={handleClose}>Profil Ayarları</MenuItem>
                                    <MenuItem onClick={handleLogout}>Çıkış</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    )

}