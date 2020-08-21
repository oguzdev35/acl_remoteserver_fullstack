import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    useSelector
} from 'react-redux';
import {
    Grid
} from '@material-ui/core';

import ProfileImage from './ProfileImage';
import SideContents from './SideContents';
import MainContent from './MainContent';

const useStyles = makeStyles( (theme) => ({
    root: {
        margin: theme.spacing(1),
    }
}))



export default props => {
    const { personId } = props;
    const classes = useStyles();
    const person = useSelector( state => state.persons.find( ({_id}) => _id == personId ));

    return (
        <React.Fragment>
            <Grid 
                container 
                spacing={0}
                className={classes.root}
            >
                <Grid 
                    style={{minHeight: '90vh'}}
                    container 
                    item 
                    xs={3} 
                    spacing={0}
                >
                    <Grid 
                        item 
                        xs={12}
                        style={{minHeight: '25vh', padding: '3vw'}}
                    >
                        <ProfileImage />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        style={{minHeight: '60vh', padding: '1vw'}}
                    >
                        <SideContents personId={personId} />
                    </Grid>
                </Grid>
                <Grid
                    style={{ minHeight: '90vh', marginTop: '1vw'}}
                    container
                    item
                    xs={9}
                    spacing={0}
                >
                    <MainContent person={person} />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}