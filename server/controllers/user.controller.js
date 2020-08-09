import User from '../models/user.model';
import extend from 'lodash/extend';
import dbErrorHandler from '../helpers/dbErrorHandler';

const create = (req, res) => {
    const user = new User(req.body);
    user.save()
        .then( () => res.status(200).json({
            'message': "Successfully signed up!"
        }))
        .catch( err => res.status(400).json({
            'error': dbErrorHandler.getErrorMessage(err)
        }));
}

const list = (req, res) => {
    User.find().select('username email updatedAt createdAt')
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
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    req.secretToken = undefined;
    return res.status(200).json(req.profile);
}

const update = (req, res) => {
    let user = req.profile;
    user = extend(user, req.body);
    user.updated = Date.now();

    user.save()
        .then( () => {
            user.hashed_password = undefined;
            user.salt = undefined;
            user.secretToken = undefined;
            res.status(200).json(user);
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