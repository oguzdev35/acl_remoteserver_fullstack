import Department from '../models/department.model';
import extend from 'lodash/extend';
import dbErrorHandler from '../helpers/dbErrorHandler';


const create = (req, res) => {
    const department = new Person(req.body);
    const place = req.place;
    department.save()
      .then( () => {
        place.departments.push(department);
        place.save()
          .then( () => res.status(200).json(department))
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
    const place = req.place;
    const isMaster = req.isMaster;
    const auth = req.auth;
    Department.find()
        .select('name persons')
        .then( departments => {
            if(isMaster && auth._id == user._id){
                return res.status(200).json(departments)
            }
            return res.status(200).json(
                departments.filter( department => place.departments.includes(department._id))
            )
        })
      .catch( err => res.status(400).json({
          'error': dbErrorHandler.getErrorMessage(err)
      }));
}


const departmentByID = (req, res, next, id) => {
    Department.findById(id)
        .then( department => {
            if(!department)
                return res.status(406).json({
                    'error': "Department not found"
                })
            department.populate('persons', '_id');
            req.person = person;
            next();
        })
        .catch( err => res.status(400).json({
            'error': "Department not able to be retrived"
        }))
}

const inPlace = (req, res, next) => {
    const place = req.place;
    const department = req.department;
    
    if(!place.departments.includes(department.id)){
        return res.status(403).json({
            'error': "User is not authorized"
        });
    }

    next();
}

const read = (req, res) => {
    let department = req.department;
    return res.status(200).json(department);
}

const update = (req, res) => {
    let department = req.department;
    department = extend(department, req.body);
    department.updated = Date.now();

    department.save()
        .then( () => res.status(200).json(department))
        .catch( err => res.status(400).json({
            'error': dbErrorHandler.getErrorMessage(err)
        }));
}

const remove = (req, res) => {
    let department = req.department;
    const place = req.place;
    department.remove()
        .then( deletedDepartment => {
          place.departments.pull(deletedDepartment);
          place.save()
            .then( () => res.status(200).json(deletedDepartment))
            .catch( err => res.status(400).json({
                'error': dbErrorHandler.getErrorMessage(err)
            }))
        })
        .catch( err => res.status(400).json({
            'error': dbErrorHandler.getErrorMessage(err)
        }));
}


export default {
    create, list, departmentByID, 
    read, update, remove,
    inPlace
};
