import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import expressJwt from 'express-jwt';
import config from '../../config/config';

const signin = (req, res) => {
    const {email, username, password} = req.body;

    const queryCondition = email ? {'email': email} : username ? {'username': username} : null;

    if(!queryCondition) return res.status(400).json({
        'error': 'Email adresi veya şifre gerekli.'
    });

    User.findOne(queryCondition)
        .then( user => {
            if(!user)
                return res.status(401).json({
                    'error': "Kullanıcı sistemimizde bulunamadı."
                });
            if(!user.authenticate(password))
                return res.status(401).json({
                    'error': `${queryCondition.email ? 'Email' : 'Kullanıcı adı'} ve şifre eşleşmedi.`
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
                    'error': "Kullanıcı oturumu gerçekleştirilemedi."
                }))
        })
        .catch( err => res.status(401).json({
            'error': "Kullanıcı giriş yapamadı. Tekrar deneyiniz."
        }));
};


const signout = (req, res) => {

    User.findOne({'username': req.profile.username})
        .then( user => {
            user.secretToken = null;
            user.save()
                .then( () => res.status(200).json(user))
                .catch( err => res.status(400).json({
                    'error': 'Kullanıcı çıkış yapamadı'
                }));
        })
        .catch( err => res.status(406).json({
            'error': 'Kullanıcı sistemimizde bulunamadı.'
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
            if(!user) {
                return res.status(406).json({
                    'error': "Kullanıcı sistemimizde bulunamadı"
                });
            }
            if(appID == config.appID && user.isMaster){
                req.isMaster = true;
                next();
            } else {
                next();
            }
            
        })
        .catch( err => {
            res.status(400).json({
                'error': dbErrorHandler.getErrorMessage(err)
            })
        });
};

const hasAuthorization = (req, res, next) => {
    const authorized = req.isMaster || (req.profile  && req.auth && (req.profile._id == req.auth._id));
    if(!authorized){
        return res.status(403).json({
            'error': "Kullanıcı yetkili değildir."
        });
    }
    next();
};

export default {
    signin, signout, requireSignin,
    requireMaster, hasAuthorization
};