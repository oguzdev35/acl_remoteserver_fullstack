import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { listDepartment } from '../../../../../../../store/actions/department.action';
import { listPlace } from '../../../../../../../store/actions/place.action';
import { useDispatch, useSelector, useStore } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));


export default (props) => {

    const { 
        person
    } = props;

    const userId = useStore().getState().user._id;
    const places = useSelector( state => state.places);
    const departments = useSelector( state => state.departments );

    const classes = useStyles();
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(listPlace({
            userId: userId
        }))
    }, []);

    React.useEffect( () => {
        dispatch(listDepartment({
            placeId: places.find(({persons}) => persons.includes(person._id))._id,
            userId: userId
        }))
    }, [places]);

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="main mailbox folders">
                {
                    departments.map(({name, _id}) => {
                        return (
                        <ListItem 
                            key={_id} button dense 
                            style={{background: "#4c6273", color: 'white', margin: "1vh", borderRadius: '1vh'}}
                        >
                            <ListItemText primary={name} />
                        </ListItem>
                        )
                    })
                }

            </List>
        </div>
    );
}