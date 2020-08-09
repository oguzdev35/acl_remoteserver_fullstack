import Person from '../models/person.model';
import extend from 'lodash/extend';
import dbErrorHandler from '../helpers/dbErrorHandler';


const create = (req, res) => {
  const person = new Person(req.body);
  person.save()
    .then( () => res.status(200).json({
        'message': "Person successfully registerd!"
    }))
    .catch( err => res.status(400).json({
        'error': dbErrorHandler.getErrorMessage(err)
    }));
}

const list = (req, res) => {
  Person.find()
    .select('firstName lastName phone1 phone2 address1 address2 email createdAt updatedAt doors logs')
    .then( persons => res.status(200).json(persons))
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
        req.person = person;
        next();
    })
    .catch( err => res.status(400).json({
        'error': "Person not able to be retrived"
    }))
}

const read = (req, res) => {
  return res.status(200).json(req.person);
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

const remove = (req, res) => {
  let person = req.person;
  person.remove()
      .then( deletedPerson => res.status(406).json(deletedPerson))
      .catch( err => res.status(400).json({
          'error': dbErrorHandler.getErrorMessage(err)
      }));
}

export default {
  create, list, personByID, read, update, remove
};
