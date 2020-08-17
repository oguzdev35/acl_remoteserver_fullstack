import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'material-ui-image';

const useStyles = makeStyles( theme => ({
    root: {
        margin: theme.spacing(0)
    },
    image: {
        borderRadius: '5%',
        border: '3px solid #ddd',
        '&:hover': {
            boxShadow: '0 0 3px 3px rgba(0, 140, 186, 0.5)'
        }
    }
}))

export default props => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Image
                className={classes.image}
                src="http://loremflickr.com/300/200"
            />
        </div>
    )
}
