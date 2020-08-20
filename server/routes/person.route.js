import express from 'express';
import personCtrl from '../controllers/person.controller';
import userCtrl from '../controllers/user.controller';
import authCtrl from '../controllers/auth.controller';
import placeCtrl from '../controllers/place.controller';
import departmentCtrl from '../controllers/department.controller';

const router = express.Router();

router.route('/api/persons/:placeId/:userId')
    .get(authCtrl.requireSignin, authCtrl.requireMaster, authCtrl.hasAuthorization, placeCtrl.inUser, personCtrl.list)
    .post(authCtrl.requireSignin, authCtrl.requireMaster, authCtrl.hasAuthorization, placeCtrl.inUser, personCtrl.create);


router.route('/api/persons/:personId/:placeId/:userId')
    .get(authCtrl.requireSignin, authCtrl.requireMaster, authCtrl.hasAuthorization, placeCtrl.inUser, personCtrl.inPlace, personCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.requireMaster, authCtrl.hasAuthorization, placeCtrl.inUser, personCtrl.inPlace, personCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.requireMaster, authCtrl.hasAuthorization, placeCtrl.inUser, personCtrl.inPlace, personCtrl.remove);

router.route('/api/persons/assign')
    .post(
        userCtrl.bodyID,
        placeCtrl.bodyID,
        personCtrl.bodyID,
        departmentCtrl.bodyID,
        // authCtrl.requireSignin, 
        // authCtrl.hasAuthorization,
        placeCtrl.inUser,
        personCtrl.inPlace,
        departmentCtrl.inPlace,
        personCtrl.assign
    )

router.route('/api/persons/revoke')
    .delete(
        userCtrl.bodyID,
        placeCtrl.bodyID,
        personCtrl.bodyID,
        departmentCtrl.bodyID,
        authCtrl.requireSignin, 
        authCtrl.hasAuthorization,
        placeCtrl.inUser,
        personCtrl.inPlace,
        departmentCtrl.inPlace,
        personCtrl.revoke
    )

router.param('userId', userCtrl.userByID);
router.param('personId', personCtrl.personByID);
router.param('placeId', placeCtrl.placeByID);

export default router;