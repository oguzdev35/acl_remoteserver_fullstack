import User from '../models/user.model';
import extend from 'lodash/extend';
import dbErrorHandler from '../helpers/dbErrorHandler';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import config from '../../config/config';

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
                    res.json({
                        'user': user
                    })
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

    User.findOne({'username': req.body.username})
        .then( user => {
            user.secretToken = null;
            user.save()
                .then( () => res.status(200).json({
                    'message': "User signed out"
                }))
                .catch( err => res.status(400).json({
                    'error': 'User cannot signed out'
                }));
        })
        .catch( err => res.status(406).json({
            'error': 'Username not found'
        }));

};


const requireSignin = expressJwt({
    secret: config.jwtSecret,
    algorithms: ['HS256'],
    credentialsRequired: false,
    userProperty: "auth",
    getToken: (req) => {
        let token = null;
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            token = req.query.token;
        }

        if(token && req.profile && req.profile.secretToken === token){
            return token;
        } else {
            return null;
        }
      }
});

const hasAuthorization = (req, res, next) => {

    const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!authorized){
        return res.status(403).json({
            'error': "User is not authorized"
        });
    }

    next();
}

export default {
    create, list, userByID, read, update, remove,
    signin, signout, requireSignin, hasAuthorization
};