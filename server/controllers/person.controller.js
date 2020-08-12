import Person from '../models/person.model';
import Door from '../models/door.model';
import extend from 'lodash/extend';
import dbErrorHandler from '../helpers/dbErrorHandler';


const create = (req, res) => {
  const person = new Person(req.body);
  const user = req.profile;
  person.save()
    .then( () => {
      user.persons.push(person);
      user.save()
        .then( () => res.status(200).json(person))
        .catch( err => res.status(400).json({
            'error': dbErrorHandler.getErrorMessage(err)
        }))
    })
    .catch( err => res.status(400).json({
        'error': dbErrorHandler.getErrorMessage(err)
    }));
}


const list = (req, res) => {
  const user = req.profile;
  Person.find()
    .select('personId firstName lastName phone1 phone2 address1 address2 email createdAt updatedAt doors logs')
    .then( persons => res.status(200).json(
        persons.filter( person => user.persons.includes(person.id))
    ))
    .catch( err => res.status(400).json({
        'error': dbErrorHandler.getErrorMessage(err)
    }));
}


const personByID = (req, res, next, id) => {
  Person.findById(id)
      .then( person => {
          if(!person)
              return res.status(406).json({
                  'error': "Person not found"
              })
          person.populate('doors', '_id');
          req.person = person;
          next();
      })
      .catch( err => res.status(400).json({
          'error': "Person not able to be retrived"
      }))
}

const inUser = (req, res, next) => {
  const user = req.profile;
  const person = req.person;
  
  if(!user.persons.includes(person.id)){
      return res.status(403).json({
          'error': "User is not authorized"
      });
  }

  next();
}

const read = (req, res) => {
  let person = req.person;
  return res.status(200).json(person);
}

const update = (req, res) => {
  let person = req.person;
  person = extend(person, req.body);
  person.updated = Date.now();

  person.save()
      .then( () => res.status(200).json(person))
      .catch( err => res.status(400).json({
          'error': dbErrorHandler.getErrorMessage(err)
      }));
}

const assign = (req, res) => {
  let door = req.door;
  let person = req.person;

  person.doors.push(door);
  person.save()
    .then( (person) => res.status(200).json(person))
    .catch( err => res.status(400).json({
      'error': "Assignment failed"
  }))
}

const revoke = (req, res) => {
  let door = req.door;
  let person = req.person;

  person.doors.pull(door);
  person.save()
    .then( (person) => res.status(200).json(person))
    .catch( err => res.status(400).json({
      'error': "Assignment failed"
  }))
}

const remove = (req, res) => {
  let person = req.person;
  const user = req.profile;
  person.remove()
      .then( deletedPerson => {
        user.doors.pull(deletedPerson);
        user.save()
          .then( () => res.status(200).json(deletedPerson))
          .catch( err => res.status(400).json({
              'error': dbErrorHandler.getErrorMessage(err)
          }))
      })
      .catch( err => res.status(400).json({
          'error': dbErrorHandler.getErrorMessage(err)
      }));
}


export default {
  create, list, personByID, 
  read, update, remove, assign,
  revoke, inUser
};
