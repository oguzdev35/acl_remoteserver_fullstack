import React from 'react';
import {  } from '@material-ui/core/styles';
import {
    Accordion, AccordionSummary,
    AccordionDetails, Typography, makeStyles
} from '@material-ui/core';
import {
    ExpandMore as ExpandMoreIcon
} from '@material-ui/icons';


import PersonInfo from './PersonInfo';
import WhichDepartments from './WhichDepartments';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    heading: {
        fontSize: theme.typography.pxToRem(20),
        fontWeight: theme.typography.fontWeightMedium
    }
}));

export default props => {

    const { person } = props;

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    id="person-info"
                >
                <Typography className={classes.heading}>Personel Bilgileri</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <PersonInfo person={person}/>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    id="person-authorization"
                >
                <Typography className={classes.heading}>Bağlı Olduğu Departmanlar</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <WhichDepartments person={person} />
                </AccordionDetails>
            </Accordion>    
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    id="person-log"
                >
                <Typography className={classes.heading}>Giriş Kayıtları</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>    
        </div>
    )
}