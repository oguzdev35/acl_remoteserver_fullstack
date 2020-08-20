import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    useSelector
} from 'react-redux';
import {
    Grid
} from '@material-ui/core';

import SideContents from './SideContents';
import MainContent from './MainContent';

const useStyles = makeStyles( (theme) => ({
    root: {
        margin: theme.spacing(1),
    }
}))



export default props => {
    const { departmentId } = props;
    const classes = useStyles();
    const department = useSelector( state => state.departments.find( ({_id}) => _id == departmentId ));

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
                        style={{minHeight: '60vh', padding: '1vw'}}
                    >
                        <SideContents departmentId={departmentId} />
                    </Grid>
                </Grid>
                <Grid
                    style={{ minHeight: '90vh', marginTop: '1vw'}}
                    container
                    item
                    xs={9}
                    spacing={0}
                >
                    <MainContent department={department} />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}