import 'react-day-picker/lib/style.css';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button, Stepper, Step,
    StepLabel, StepContent,
    Paper, Typography, Dialog,
    DialogTitle, DialogContent,
    DialogActions, InputLabel,
    MenuItem, FormControl, Select,
    FormLabel, FormControlLabel, FormHelperText,
    Checkbox, FormGroup, NativeSelect,
    Grid, TextField, List, ListItem,
    ListItemText, ListItemIcon
} from '@material-ui/core';
import { useDispatch, useStore, useSelector } from 'react-redux';

import Helmet from 'react-helmet';
import DayPicker, { DateUtils } from 'react-day-picker';

import moment from "moment";

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
    formControl: {
        margin: theme.spacing(3)
    },
    dateinterval: {
        margin: theme.spacing(1)
    },
    daySwitchList: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    }
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

    const classes = useStyles();

    const {
        startDate,
        endDate,
        setStartDate,
        setEndDate,
    } = props;

    const [enteredTo, setEnteredTo] = React.useState(null);

    const isSelectingFirstDay = (from, to, day) => {
        const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
        const isRangeSelected = from && to;
        return !from || isBeforeFirstDay || isRangeSelected;
    }
    
    const handleResetClick = () => {
        setStartDate(null);
        setEnteredTo(null);
        setEndDate(null);
    }
   

    const handleDayClick = (day) =>  {
        if (startDate && endDate && day >= startDate && day <= endDate) {
            handleResetClick();
            return;
        }
        if (isSelectingFirstDay(startDate, endDate, day)) {
            setStartDate(day);
            setEndDate(null);
            setEnteredTo(null);

        } else {
            setEndDate(day);
            setEnteredTo(day);
        }
    }

    const handleDayMouseEnter = (day) => {
        if (!isSelectingFirstDay(startDate, endDate, day)) {
            setEnteredTo(day);
        }
    }

    const modifiers = { start: startDate, end: enteredTo };
    const disabledDays = { before: startDate };
    const selectedDays = [startDate, { from: startDate, to: enteredTo }];

    return (
        <Grid 
            container 
            className={classes.dateinterval}
            spacing={2}
        >
            <Grid item xs={5}>
                <DayPicker
                    className="Range"
                    numberOfMonths={1}
                    fromMonth={startDate}
                    selectedDays={selectedDays}
                    disabledDays={disabledDays}
                    modifiers={modifiers}
                    onDayClick={handleDayClick}
                    onDayMouseEnter={handleDayMouseEnter}
                />
                <Helmet>
                    <style>{`
                        .Range .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
                            background-color: #f0f8ff !important;
                            color: #4a90e2;
                        }
                        .Range .DayPicker-Day {
                            border-radius: 0 !important;
                        }
                    `}</style>
                </Helmet>
            </Grid>
            <Grid item xs={5}>
                {startDate && endDate && (
                        <Button 
                            style={{margin: '2vw'}}
                            variant="outlined"  
                            onClick={handleResetClick}
                        >
                            İşlemi Tekrarlayın
                        </Button>
                    )}
                <Typography>
                    {!startDate && !endDate && 'Lütfen başlangıç gününü seçiniz.'}
                    {startDate && !endDate && 'Lütfen bitiş gününü seçiniz.'}
                    {startDate &&
                        endDate && <div>
                            <TextField 
                                label="Başlangıç Tarihi"
                                value={startDate.toLocaleDateString()}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="outlined"
                                style={{margin: '2vw'}}
                            />
                            <TextField 
                                label="Bitiş Tarihi"
                                value={endDate.toLocaleDateString()}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="outlined"
                                style={{margin: '2vw'}}
                            />
                            </div>
                        // `Selected from ${startDate.toLocaleDateString()} to
                        //     ${endDate.toLocaleDateString()}`
                    }{' '}
                </Typography>
            </Grid>
        </Grid>
    )

}

function OnlyOneDay(props){
    const classes = useStyles();

    const {
        oneDate,
        setOneDate,
    } = props;


    // const onChange = date => {
    //     setOneDate(date)
    // };

    const handleDayClick = (day, {selected}) =>{
        if(!selected){
            setOneDate(day);
        }else {
            setOneDate(undefined)
        }
    }

    return (
        <Grid 
            container 
            className={classes.dateinterval}
            spacing={2}
        >
            <Grid item xs={5}>
                <DayPicker
                    selectedDays={oneDate}
                    onDayClick={handleDayClick}
                />
            </Grid>
            <Grid item xs={5}>
                <TextField
                    style={{margin: '2vw'}}
                    id="selected-date"
                    label="Seçilen Tarihi"
                    value={oneDate ? oneDate.toLocaleDateString(): "Please select a day"}
                    variant="outlined"
                />
            </Grid>
        </Grid>
    )
   
}

const days = [
    {idx: 0, text: 'Pazartesi'},
    {idx: 1, text: 'Salı'},
    {idx: 2, text: 'Çarşamba'},
    {idx: 3, text: 'Perşembe'},
    {idx: 4, text: 'Cuma'},
    {idx: 5, text: 'Cumartesi'},
    {idx: 6, text: 'Pazar'}
]

function DaysInWeekPick(props){
    const classes = useStyles();
    const {
        selectedDates,
        setSelectedDates
    } = props;
  
    const handleToggle = (value) => () => {
      const currentIndex = selectedDates.indexOf(value);
      const newChecked = [...selectedDates];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setSelectedDates(newChecked);
    };

    return (
        <List className={classes.root}>
          {days.map(({idx, text}) => {
            const labelId = `${text}-${idx}`;
    
            return (
              <ListItem key={idx} role={undefined} dense button onClick={handleToggle(idx)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={selectedDates.indexOf(idx) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={text} />
              </ListItem>
            );
          })}
        </List>
      );
}

function DateSelectionMain(props){

    const {
        startDate,
        endDate,
        setStartDate,
        setEndDate,
        datePickingMethod,
        setDatePickingMethod,
        selectedDates,
        setSelectedDates,
        oneDate,
        setOneDate
    } = props;

    const classes = useStyles();

    const handleChange = (event) => {
        setDatePickingMethod(event.target.value);
    };
    return (
        <React.Fragment>
            <FormControl className={classes.formControl}>
                <NativeSelect
                    value={datePickingMethod}
                    onChange={handleChange}
                    name="Yöntem"
                    className={classes.selectEmpty}
                    inputProps={{ 'aria-label': 'age' }}
                >
                <option value="">Seçiniz</option>
                <option value={1}>Tarih Aralığı Belirle</option>
                <option value={2}>Haftanın Belirli Günleri</option>
                <option value={3}>Tek Bir Gün Seç</option>
                </NativeSelect>
                <FormHelperText>Tarih Belirleme Yöntemi</FormHelperText>

            </FormControl>
            { datePickingMethod == 1 ? <DateIntervalPick 
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate} 
            /> : datePickingMethod == 2 ? <DaysInWeekPick 
                selectedDates={selectedDates}
                setSelectedDates={setSelectedDates}
            /> : datePickingMethod == 3 ? <OnlyOneDay 
                oneDate={oneDate}
                setOneDate={setOneDate}
            /> : <React.Fragment>
                    <Typography>Lütfen Tarih Belirleme Yöntemi Seçiniz!</Typography>
                </React.Fragment>
                }
        </React.Fragment>
    )
}

function ClockIntervalPick(){
    return <>fd</>
}



function getSteps() {
    return ['Personelin Yetkilendirileceği Kapıları Seçiniz', 'Tarih Belirleyiniz', 'Saat Belirleyiniz'];
}
  
function getStepContent(step, personId, places) {

    const [selectedDoors, setSelectedDoors] = React.useState([]);

    const dispatch = useDispatch();
    const globalState = useStore().getState();
    const blocks = useSelector( state => state.blocks)

    React.useEffect( () => {
        dispatch(listBlock({
            placeId: places.find(({persons}) => persons.includes(personId))._id,
            userId: globalState.user._id
        }));
    }, []);

    // 1 -> interval 2-> days in week 3 -> specific day
    const [datePickingMethod, setDatePickingMethod] = React.useState("");

    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);

    const [selectedDates, setSelectedDates] = React.useState([]);

    const [oneDate, setOneDate] = React.useState(new Date());

    const [clockValue, setClockValue] = React.useState(moment());

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
            return <DateSelectionMain 
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                datePickingMethod={datePickingMethod} 
                setDatePickingMethod={setDatePickingMethod}
                selectedDates={selectedDates}
                setSelectedDates={setSelectedDates}
                oneDate={oneDate}
                setOneDate={setOneDate}
            />
            break;
        case 2:
            return <ClockIntervalPick 
                clockValue={clockValue}
                setClockValue={setClockValue}
            />;
            break;
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