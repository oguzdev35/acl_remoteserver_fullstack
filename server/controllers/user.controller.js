import User from '../models/user.model';
import config from '../../config/config';
import extend from 'lodash/extend';
import dbErrorHandler from '../helpers/dbErrorHandler';
import jwt from 'jsonwebtoken';

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
    User.findById(req.body.id)
        .then( user => {
            if(!user)
            return res.status(406).json({
                'error': "User not found"
            })
            user.secretToken = undefined;
            user.hashed_password = undefined;
            user.salt = undefined;
            user.isMaster = undefined;
            return res.status(200).json(user);
        })
        .catch( err => res.status(400).json({
            'error': "User not able to be retrived"
        }))
}

const update = (req, res) => {
    User.findById(req.body.id)
        .then( user => {
            if(!user)
            return res.status(406).json({
                'error': "User not found"
            })
            let updatedUser = extend(user, req.body.updatedProperties);
            updatedUser.updated = Date.now();
            updatedUser.save()
                .then( user => {
                    user.hashed_password = undefined;
                    user.salt = undefined;
                    user.secretToken = undefined;
                    res.status(200).json(user);
                })
                .catch( err => res.status(400).json({
                    'error': dbErrorHandler.getErrorMessage(err)
                }));
        })
        .catch( err => res.status(400).json({
            'error': "User not able to be retrived"
        }))
}


const remove = (req, res) => {

    User.findById(req.body.id)
    .then( user => {
        if(!user)
        return res.status(406).json({
            'error': "User not found"
        })
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
    })
    .catch( err => res.status(400).json({
        'error': "User not able to be retrived"
    }))
}


const signin = (req, res) => {
    const {email, username, password} = req.body;

    const queryCondition = email ? {'email': email} : username ? {'username': username} : null;

    if(!queryCondition) return res.status(400).json({
        'error': 'Email or password required.'
    });

    User.findOne(queryCondition)
        .then( user => {
            if(!user)
                return res.status(401).json({
                    'error': "User not found"
                });
            if(!user.authenticate(password))
                return res.status(401).json({
                    'error': `${queryCondition.email ? 'Email' : 'Username'} and password don't match.`
                });
            const token = jwt.sign({_id: user._id}, config.jwtSecret);

            user.secretToken = token;

            user.save()
                .then( user => {
                    user.hashed_password = undefined;
                    user.salt = undefined;
                    res.json(user)
                })
                .catch( err => res.status(400).json({
                    'error': "User's sessionToken is not able to be updated"
                }))
        })
        .catch( err => res.status(401).json({
            'error': "Could not sign in"
        }));
};


const signout = (req, res) => {

    User.findOne({'username': req.profile.username})
        .then( user => {
            user.secretToken = null;
            user.save()
                .then( () => res.status(200).json(user))
                .catch( err => res.status(400).json({
                    'error': 'User cannot signed out'
                }));
        })
        .catch( err => res.status(406).json({
            'error': 'Username not found'
        }));

};

const requireSignin = (req, res, next) => {
    let token = null;
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        token = req.query.token;
    }

    if(token){
        User.findOne({secretToken: token})
            .then( user => {
                req.auth = user;
                next();
            })
            .catch( err => res.status(406).json({
                'error': 'User not found'
            }))
    } else {
        return res.status(403).json({
            'error': 'User is not Signed in'
        })
    }
}


const requiresMaster = (req, res, next) => {
    const appID = req.headers['x-app-id'];
    const user = req.profile;

    if(appID == config.appID && user.isMaster){
        next();
    } else {
        return res.status(403).json({
            'error': 'User is not a master'
        })
    }

};

const hasAuthorization = (req, res, next) => {
    const authorized = req.profile.isMaster || (req.profile  && req.auth && (req.profile._id == req.auth._id));
    console.log(authorized)
    if(!authorized){
        return res.status(403).json({
            'error': "User is not authorized"
        });
    }
  
    next();
  }

export default {
    create, list, userByID, read, update, remove,
    signin, signout, requireSignin, hasAuthorization,
    requiresMaster
};