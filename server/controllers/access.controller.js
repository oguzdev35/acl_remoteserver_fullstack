import Rule from '../models/rule.model';
import Door from '../models/door.model';
import Person from '../models/person.model';
import {isAfter, isBefore, getDay} from 'date-fns';

const access = async (req, res) => {
  const {
    dateInput, doorTagId, personTagId
  } = req.body;

  try {

    const person = await Person.findOne({'personTagId': personTagId});

    let departments = person.departments;

    let rules = await Rule.find({department: [...departments]});

    const door = await Door.findOne({'doorTagId': doorTagId});

    rules = rules.filter( ({doors}) => doors.includes(door._id));


    const isAllowed = rules.find( ({oneDay, _fromClock, _toClock, _fromDate, _toDate, dateType, daysInWeek}) => {

      switch(dateType){
        case "1":
          const _begin1 = (new Date(_fromDate)).setHours(String(Number(_fromClock[0]) + 3), _fromClock[1]);
          const _end1 = (new Date(_toDate)).setHours(String(Number(_toClock[0]) + 3), _toClock[1]);
          
          const _isAfter1 = isAfter(new Date(_end1), new Date(dateInput));
          const _isBefore1 = isBefore(new Date(_begin1), new Date(dateInput));
          return _isAfter1 && _isBefore1;        
          break;
        case "2":
          const inputMinutes = (((new Date(dateInput)).getHours() + 24 - 3) % 24) * 60 + (new Date(dateInput)).getMinutes();
          const toMinutes = Number(_toClock[0])  * 60 + Number(_toClock[1]);
          const fromMinutes  = Number(_fromClock[0])  * 60 + Number(_fromClock[1]);
          const isDayInWeek =  daysInWeek.includes(getDay(new Date(dateInput).setHours(((new Date(dateInput)).getHours() -3))));
          console.log(inputMinutes < toMinutes && inputMinutes > fromMinutes)
          return inputMinutes < toMinutes && inputMinutes > fromMinutes && isDayInWeek;
          break;
        case "3":
          const _begin3 = (new Date(oneDay)).setHours(String(Number(_fromClock[0]) + 3), _fromClock[1]);
          const _end3 = (new Date(oneDay)).setHours(String(Number(_toClock[0]) + 3), _toClock[1]);
          
          const _isAfter3 = isAfter(new Date(_end3), new Date(dateInput));
          const _isBefore = isBefore(new Date(_begin3), new Date(dateInput));
          return _isAfter3 && _isBefore3;
          break;
        default:
          return false;
          break;
      }


    })

    if(isAllowed){
      return res.status(200).json({'msg': 'Allowd'});
    } else {
      return res.status(200).json({'msg': 'Denied'})
    }
  } catch(err){
    res.status(400).json({'error': 'Birşeyler ters'})
  }

}

export default {
  access
}