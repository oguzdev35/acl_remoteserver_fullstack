import Rule from '../models/rule.model';
import extend from 'lodash/extend';
import dbErrorHandler from '../helpers/dbErrorHandler';

const create = (req, res) => {
    const person = req.person;
    let rule = new Rule(req.body.data);
    rule = extend(rule, person);
    rule.save()
        .then( () => {
            res.status(200).json(rule)
        })
        .catch( err => res.status(400).json({
            'error': dbErrorHandler.getErrorMessage(err)
        }));
    
};

const list = (req, res) => {
    const door = req.door;
    const person = req.person;
    const doorTagId = door.get('doorTagId');
    const personTagId = person.get('personTagId');

    Rule.find({doorTagId, personTagId }).select('doorTagId personTagId dateInterval clockInterval')
        .then( rules => {
            return res.status(200).json(rules)
        })
        .catch( err => res.status(400).json({
            'error': dbErrorHandler.getErrorMessage(err)
        }));
}


export default {
    create, list
};