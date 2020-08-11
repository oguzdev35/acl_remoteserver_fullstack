import Door from '../models/door.model';
import extend from 'lodash/extend';
import dbErrorHandler from '../helpers/dbErrorHandler';


const create = (req, res) => {
  const door = new Door(req.body);
  const user = req.profile;
  door.save()
    .then( () => {
      user.doors.push(door);
      user.save()
        .then( () => res.status(200).json(door))
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
  Door.find().select('name logs createdAt updatedAt')
    .then( doors => res.status(200).json(
        doors.filter( door => user.doors.includes(door.id))
    ))
    .catch( err => res.status(400).json({
        'error': dbErrorHandler.getErrorMessage(err)
    }));
}


const doorByID = (req, res, next, id) => {
  Door.findById(id)
      .then( door => {
          if(!door)
              return res.status(406).json({
                  'error': "Door not found"
              })
          req.door = door;
          next();
      })
      .catch( err => res.status(400).json({
          'error': "Door not able to be retrived"
      }))
}

const read = (req, res) => {
  return res.status(200).json(req.door);
}

const update = (req, res) => {
  let door = req.door;
  door = extend(door, req.body);
  door.updated = Date.now();

  door.save()
      .then( () => res.status(200).json(door))
      .catch( err => res.status(400).json({
          'error': dbErrorHandler.getErrorMessage(err)
      }));
}

const remove = (req, res) => {
  let door = req.door;
  const user = req.profile;
  door.remove()
      .then( deletedDoor => {
        user.doors.pull(deletedDoor);
        user.save()
          .then( () => res.status(200).json(deletedDoor))
          .catch( err => res.status(400).json({
              'error': dbErrorHandler.getErrorMessage(err)
          }))
      })
      .catch( err => res.status(400).json({
          'error': dbErrorHandler.getErrorMessage(err)
      }));
}

export default {
  create, list, doorByID, read, 
  update, remove
};
