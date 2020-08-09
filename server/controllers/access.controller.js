import Log from '../models/log.model';
import Door from '../models/door.model';
import Person from '../models/person.model';
import extend from 'lodash/extend';
import dbErrorHandler from '../helpers/dbErrorHandler';

const access = (req, res) => {
  const { personId, doorId } = req.body;


  Person.findOne({'personId': personId})
    .then( person => {
      let doorObjectId = null;
      return Door.findOne({'doorId': doorId})
        .then( door => {
          if(!door)
            return res.status(406).json({
              'error': 'Door not found'
            })
          doorObjectId = door.id;
          const doorName = door.name;
          const personFullName = person.fullname;
          return {doorObjectId, door, person, doorName, personFullName}
        })
        .catch( err => res.status(400).json({
          'error': "Door not able to be retrived"
        }))
    
    })
    .then( ({doorObjectId, person, door, doorName, personFullName}) => {

      const doorObjectIdList = person.get('doors');

      let result = false;


      doorObjectIdList.forEach( doorObjectIdItem => {
        // In fact, we compare string vs object, since we use '=='
        // operator, javascript engine introduce at this point
        // 'type coercion' to the stage.
        if(doorObjectId == doorObjectIdItem ){
          result = true;
        }
      });


      if(result){
        console.log('he')
        const newLog = new Log({
          'personId': personId,
          'doorId': doorId,
          'doorName': doorName,
          'personFullName': personFullName,
          'isPermitted': true
        })
        newLog.save()
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

            return res.status(200).json({
              'message': 'permitted'
            })
          })
          .catch( err => res.status(400).json({
              'error': dbErrorHandler.getErrorMessage(err)
          }));

      } else {
        const newLog = new Log({
          'personId': personId,
          'doorId': doorId,
          'doorName': doorName,
          'personFullName': personFullName,
          'isPermitted': false
        });


        newLog.save()
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

            return res.status(200).json({
              'message': 'denied'
            })
          })
          .catch( err => res.status(400).json({
              'error': dbErrorHandler.getErrorMessage(err)
          }));
      }

    })
    .catch( err => res.status(400).json({
      'error': "Person not able to be retrived"
    }))
}

export default {
  access
}