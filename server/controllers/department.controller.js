import Department from '../models/department.model';
import extend from 'lodash/extend';
import dbErrorHandler from '../helpers/dbErrorHandler';


const create = (req, res) => {
    const department = new Department(req.body);
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
                    'error': "Departman ismi sistemimizde bulunamamıştır."
                })
            
            req.department = department;
            next();
        })
        .catch( err => res.status(400).json({
            'error': "Departman ismini ararken sistemimizde bir sorun oluştu."
        }))
}

const bodyID = (req, res, next) => {
    const id = req.body.meta.departmentId;
    Department.findById(id)
        .then( department => {
            if(!department)
                return res.status(406).json({
                    'error': "Departman ismi sistemimizde bulunamamıştır."
                })
            
            req.department = department;
            next();
        })
        .catch( err => res.status(400).json({
            'error': "Departman ismini ararken sistemimizde bir sorun oluştu."
        }))
}

const inPlace = (req, res, next) => {
    const place = req.place;
    const department = req.department;
    
    if(!place.departments.includes(department.id)){
        return res.status(403).json({
            'error': "Kullanıcı yetkili değil"
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

const assign = (req, res) => {
    let person = req.person;
    let department = req.department;
    
    person.departments.push(department);
    department.persons.push(person);
    department.save()
        .then( async () => {
            try {
                await person.save();
            } catch (error) {
                return res.status(400).json({
                    'error': 'Departmanın personel ataması sırasında bir hata oluştu'
                })
            }
        })
        .then( () => res.status(200).json(department) )
        .catch( err => res.status(400).json({
            'error': 'Departmanın personel ataması sırasında bir hata oluştu'
        }));
};


const revoke = (req, res) => {
    let person = req.person;
    let department = req.department;
    
    person.departments.pull(department);
    department.persons.pull(person);
    department.save()
        .then( async () => {
            try {
                await person.save();
            } catch (error) {
                return res.status(400).json({
                    'error': 'Departmandan personel silinmesi sırasında bir hata oluştu'
                })
            }
        })
        .then( () => res.status(200).json(department) )
        .catch( err => res.status(400).json({
            'error': 'Departmandan personel silinmesi sırasında bir hata oluştu'
        }));
}

export default {
    create, list, departmentByID, 
    read, update, remove,
    inPlace, bodyID, assign,
    revoke
};
