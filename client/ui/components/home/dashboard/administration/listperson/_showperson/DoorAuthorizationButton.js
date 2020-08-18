import 'date-fns';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
  DatePicker
} from '@material-ui/pickers';
import {
    Button, Stepper, Step,
    StepLabel, StepContent,
    Paper, Typography, Dialog,
    DialogTitle, DialogContent,
    DialogActions, InputLabel,
    MenuItem, FormControl, Select,
    FormLabel, FormControlLabel, FormHelperText,
    Checkbox, FormGroup
} from '@material-ui/core';
import { useDispatch, useStore, useSelector } from 'react-redux';

import { listPlace } from '../../../../../../../store/actions/place.action';
import { listBlock } from '../../../../../../../store/actions/block.action';
import { listDoor } from '../../../../../../../store/actions/door.action';


const useStyles = makeStyles( (theme) => ({
    root: {
        width: '100%',
      },
    button: {
        margin: theme.spacing(1)
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(3)
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    formControlBlock: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    formControlDoor: {
        margin: theme.spacing(3),
    },
}));

function BlockAndDoorSelect(props){

    const { 
        blocks, placeId, userId,
        selectedDoors, setSelectedDoors
    } = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const [selectedBlock, setSelectedBlock] = React.useState('');
    
    const doors = useSelector(state => state.doors);
    
  
    const handleChangeBlock = (event) => {
        setSelectedBlock(event.target.value);
    };

    const handleChangeDoor = (event) => {
        if(event.target.checked){
            setSelectedDoors(state => [
                ...state,
                event.target.name
            ])
        } else {
            setSelectedDoors(state => [
                ...state.filter( id => id != event.target.name), 
            ])
        }

    };

    React.useEffect( () => {
        if(selectedBlock != ''){
            dispatch(listDoor({
                placeId: placeId,
                blockId: selectedBlock,
                userId: userId
            }))
        }
 
    }, [selectedBlock])



    return (
        <React.Fragment>
            <FormControl className={classes.formControlBlock}>
                <InputLabel id="block-open-select-label">Blok Seçiniz</InputLabel>
                <Select
                    labelId="block-open-select-label"
                    id="block-open-select"
                    value={selectedBlock}
                    onChange={handleChangeBlock}
                >
                <MenuItem value="">
                    <em>Hiç</em>
                </MenuItem>
                {
                    blocks.map(({_id, name}) => <MenuItem key={_id} value={_id}>{name}</MenuItem>)
                }
                </Select>
            </FormControl>
            {
                selectedBlock != '' && (
                    <FormControl component="fieldset" className={classes.formControlDoor}>
                        <FormLabel component="legend">Kapı Seçiniz</FormLabel>
                        <FormGroup>
                            {
                                doors && doors.map((item) => {
                                    const {_id, name} = item;
                                    return (
                                            <FormControlLabel
                                                key={_id}
                                                control={<Checkbox checked={selectedDoors.includes(_id)} onChange={handleChangeDoor} name={_id} />}
                                                label={name}      
                                            />
                                        )
                                    }
                                )
                            }
                        </FormGroup>
                    </FormControl>
                )
            }
        </React.Fragment>
    )
}

function DateIntervalPick(props){

    const {
        selectedDateFrom,
        selectedDateTo,
        setSelectedDateFrom,
        setSelectedDateTo
    } = props;

    const [selectedDate, handleDateChange] = React.useState(new Date());
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
             <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog-1"
                label="Başlangıç Tarihini Belirleyiniz"
                format="MM/dd/yyyy"
                value={selectedDateFrom}
                onChange={setSelectedDateFrom}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                style={{margin: '2vw'}}
            />
            <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog-2"
                label="Bitiş Tarihini Belirleyiniz"
                format="MM/dd/yyyy"
                value={selectedDateTo}
                onChange={setSelectedDateTo}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                style={{margin: '2vw'}}
            />
            <DatePicker
                views={["day"]}
                label="Year only"
                value={selectedDate}
                onChange={handleDateChange}
            />
        </MuiPickersUtilsProvider>
    )

}

function DaysInWeekPick(props){
    const [selectedDate, handleDateChange] = React.useState(new Date());
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
                views={["year"]}
                label="Year only"
                value={selectedDate}
                onChange={handleDateChange}
            />
        </MuiPickersUtilsProvider>
    )
}

function ClockIntervalPick(props){

    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Başlangıç Zamanı"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change time',
                }}
                style={{margin: '2vw'}}
            />     
            <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Bitiş Zamanı"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change time',
                }}
                style={{margin: '2vw'}}
            />       
        </MuiPickersUtilsProvider>
    )
}

function getSteps() {
    return ['Personelin Yetkilendirileceği Kapıları Seçiniz', 'Tarih Belirleyiniz', 'Saat Belirleyiniz'];
}
  
function getStepContent(step, personId, places) {

    const [selectedDoors, setSelectedDoors] = React.useState([]);


    const [selectedDateFrom, setSelectedDateFrom] = React.useState(new Date(Date.now()));
    const [selectedDateTo, setSelectedDateTo] = React.useState(new Date(Date.now()));

    const dispatch = useDispatch();
    const globalState = useStore().getState();
    const blocks = useSelector( state => state.blocks)

    React.useEffect( () => {
        dispatch(listBlock({
            placeId: places.find(({persons}) => persons.includes(personId))._id,
            userId: globalState.user._id
        }));
    }, [])


    switch (step) {
        case 0:
            return <BlockAndDoorSelect 
                        blocks={blocks} 
                        placeId={places.find(({persons}) => persons.includes(personId))._id} 
                        userId={globalState.user._id}
                        setSelectedDoors={setSelectedDoors}
                        selectedDoors={selectedDoors}
                    />
            break;
        case 1:
            return <DateIntervalPick 
                        selectedDateFrom={selectedDateFrom}
                        selectedDateTo={selectedDateTo}
                        setSelectedDateFrom={setSelectedDateFrom}
                        setSelectedDateTo={setSelectedDateTo}
                    />;
            break;
        case 2:
        return <ClockIntervalPick />
        default:
        return 'Unknown step';
    }
}

function VerticalLinearStepper(props) {

    const globalState = useStore().getState();
    const { handleClose, open, personId } = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    
    const places = useSelector( state => state.places)
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleReset = () => {
      setActiveStep(0);
    };

    React.useEffect( () => {
        dispatch(listPlace({userId: globalState.user._id}));
    }, [])
  
    return (
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="person-auth-stepper">Personel Kapı Yetkilendirme</DialogTitle>
        <DialogContent>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                    <StepContent>
                        {getStepContent(index, personId, places)}
                        <div className={classes.actionsContainer}>
                        <div>
                            <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            className={classes.button}
                            >
                            Geri
                            </Button>
                            <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            className={classes.button}
                            >
                            {activeStep === steps.length - 1 ? 'Bitir' : 'İleri'}
                            </Button>
                        </div>
                        </div>
                    </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset} className={classes.button}>
                    Reset
                    </Button>
                </Paper>
            )}
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>
                Kaydet
            </Button>
            <Button onClick={handleClose}>
                Kapat
            </Button>
        </DialogActions>
      </Dialog>
    );
}

export default props => {

    const {personId} = props;

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <React.Fragment>
            <Button
                variant="outlined"
                onClick={handleOpen}
            >
                Kapı Yetkilendirme
            </Button>
            <VerticalLinearStepper 
                personId={personId} 
                open={open} 
                handleClose={handleClose} 
            />
        </React.Fragment>
    )
}