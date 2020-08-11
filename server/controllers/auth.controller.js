import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import expressJwt from 'express-jwt';
import config from '../../config/config';

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

const requireSignin = expressJwt({
    secret: config.jwtSecret,
    userProperty: "auth",
    algorithms: ['HS256']
});


const requireMaster = (req, res, next) => {
    const appID = req.headers['x-app-id'];
    const authId = req.auth._id;

    User.findById(authId)
        .then( user => {
            if(!user)
                return res.status(406).json({
                    'error': "User not found"
                });

            if(appID == config.appID && user.isMaster){
                req.isMaster = true;
                next();
            } else {
                next();
            }
            
        })
        .catch( err => res.status(400).json({
            'error': dbErrorHandler.getErrorMessage(err)
        }));

};

const hasAuthorization = (req, res, next) => {
    const authorized = req.isMaster || (req.profile  && req.auth && (req.profile._id == req.auth._id));
    if(!authorized){
        return res.status(403).json({
            'error': "User is not authorized"
        });
    }
    next();
};

export default {
    signin, signout, requireSignin,
    requireMaster, hasAuthorization
};