import Log from '../models/log.model';
import Door from '../models/door.model';
import Person from '../models/person.model';
import extend from 'lodash/extend';
import dbErrorHandler from '../helpers/dbErrorHandler';

const access = (req, res) => {
  let door = req.door;
  let person = req.person;

  let newLOg = new Log({
    'personId': person.id,
    'doorId': door.id,
    'doorName': door.name,
    'personFullName': person.fullname,
    'isPermitted': false
  })

  
  if(person.doors.includes(door.id)){
    newLOg.isPermitted = true;
  }


  newLOg.save()
    .then( async newLog => {
      door.logs.push(newLog);
      person.logs.push(newLog);

      try {
        await door.save();
        await person.save();
      } catch (err) {
        return res.status(400).json({
          'error': err.message
        })
      }
      if(newLOg.isPermitted){
        return res.status(200).json({
          'message': 'permitted'
        });
      } else {
        return res.status(200).json({
          'message': 'denied'
        });
      }


    })
    .catch( err => res.status(400).json({
        'error': dbErrorHandler.getErrorMessage(err)
    }));

}

export default {
  access
}