import React from 'react';
import {  } from '@material-ui/core/styles';
import {
    Accordion, AccordionSummary,
    AccordionDetails, Typography, makeStyles
} from '@material-ui/core';
import {
    ExpandMore as ExpandMoreIcon
} from '@material-ui/icons';


import DepartmentInfo from './DepartmentInfo';
import AccessControlTableDateInterval from './AccessControlTableDateInterval';
import DoorAuthorizationButton from './DoorAuthorizationButton';

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

    const { department } = props;

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <DoorAuthorizationButton departmentId={department._id}  />
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    id="department-info"
                >
                <Typography className={classes.heading}>Departman Bilgileri</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <DepartmentInfo department={department}/>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    id="department-authorization"
                >
                <Typography className={classes.heading}>Departman Geçiş Kuralları(Tarih Aralıklı)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <AccessControlTableDateInterval department={department} />
                </AccordionDetails>
            </Accordion>    
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    id="department-log"
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