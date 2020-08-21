import Rule from '../models/rule.model';
import extend from 'lodash/extend';
import dbErrorHandler from '../helpers/dbErrorHandler';


const create = (req, res) => {
  const place = req.place;
  let rule = new Rule(req.body.data);
  const department = req.department;
  rule = extend(rule, {department: department._id});
  rule.save()
    .then( (rule) => {
        place.rules.push(rule);
        return res.status(200).json(rule)
    })
    .catch( err => {
      return res.status(400).json({
        'error': dbErrorHandler.getErrorMessage(err)
      })
    });
}

const list = (req, res) => {
  const user = req.profile;
  const auth = req.auth;
  const isMaster = req.isMaster;
  const place = req.place;
  Rule.find()
    .then( rules => {
        if(isMaster && auth._id == user._id){
            return res.status(200).json(rules)
        }
        return res.status(200).json(
            rules.filter( rule => place.rules.includes(rule._id))
        )
    })
    .catch( err => res.status(400).json({
        'error': dbErrorHandler.getErrorMessage(err)
    }));
}


const ruleByID = (req, res, next, id) => {
  Rule.findById(id)
      .then( rule => {
          if(!rule)
              return res.status(406).json({
                  'error': "Geçiş kuralı sistemimizde kayıtlı değildir."
              })
          req.rule = rule;
          next();
      })
      .catch( err => res.status(400).json({
          'error': "Geçiş kuralı sistemimizde kayıtlı değildir."
      }))
}

const bodyID = (req, res, next) => {
  const id = req.body.meta.ruleId;
  Rule.findById(id)
      .then( rule => {
          if(!rule)
              return res.status(406).json({
                  'error': "Geçiş kuralı sistemimizde kayıtlı değildir."
              })
          req.rule = rule;
          next();
      })
      .catch( err => res.status(400).json({
          'error': "Geçiş kuralı sistemimizde kayıtlı değildir."
      }))
}

const inPlace = (req, res, next) => {
    const place = req.place;
    const rule = req.rule;

    if(!place.rules.includes(rule._id)){
        return res.status(403).json({
            'error': "Kullanıcı yetkili değil."
        });
    }

    next();
}

const read = (req, res) => {
  return res.status(200).json(req.rule);
}

const update = (req, res) => {
  let rule = req.rule;
  rule = extend(rule, req.body);
  rule.updated = Date.now();

  rule.save()
      .then( () => res.status(200).json(rule))
      .catch( err => res.status(400).json({
          'error': dbErrorHandler.getErrorMessage(err)
      }));
}

const remove = (req, res) => {
  let rule = req.rule;
  const place = req.place;
  rule.remove()
      .then( deletedRule => {
          place.rules.pull(deletedRule._id)
          return res.status(200).json(deletedRule)
        })
      .catch( err => res.status(400).json({
          'error': dbErrorHandler.getErrorMessage(err)
      }));
}

export default {
  create, list, ruleByID, read, 
  update, remove, bodyID, inPlace
};
