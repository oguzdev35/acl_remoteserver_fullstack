import User from '../models/user.model';
import extend from 'lodash/extend';
import dbErrorHandler from '../helpers/dbErrorHandler';


const create = (req, res) => {
    const user = new User(req.body);
    user.save()
        .then( user => res.status(200).json(user))
        .catch( err => res.status(400).json({
            'error': dbErrorHandler.getErrorMessage(err)
        }));
}

const list = (req, res) => {
    User.find().select('username email updatedAt createdAt persons doors _id')
        .then( users => res.status(200).json(users))
        .catch( err => res.status(400).json({
            'error': dbErrorHandler.getErrorMessage(err)
        }));
}


const userByID = (req, res, next, id) => {
    User.findById(id)
        .then( user => {
            if(!user)
                return res.status(406).json({
                    'error': "User not found"
                })
            req.profile = user;
            next();
        })
        .catch( err => res.status(400).json({
            'error': "User not able to be retrived"
        }))
}

const read = (req, res) => {
    const user = req.profile;
    user.secretToken = undefined;
    user.hashed_password = undefined;
    user.isMaster = undefined;
    user.salt = undefined;
    return res.status(200).json(user);
}

const update = (req, res) => {
    let user = req.profile;
    user = extend(user, req.body);
    user.updatedAt = Date.now();
    user.save()
        .then( user => {
            user.hashed_password = undefined;
            user.salt = undefined;
            user.secretToken = undefined;
            user.isMaster = undefined;
            return res.status(200).json(user);
        })                
        .catch( err => res.status(400).json({
            'error': dbErrorHandler.getErrorMessage(err)
        }));
}


const remove = (req, res) => {

    let user = req.profile;
    user.remove()
        .then( deletedUser => {
            deletedUser.hashed_password = undefined;
            deletedUser.salt = undefined;
            deletedUser.secretToken = undefined;
            res.status(406).json(deletedUser);
        })
        .catch( err => res.status(400).json({
            'error': dbErrorHandler.getErrorMessage(err)
        }));

}


export default {
    create, list, userByID, read, update, remove
};