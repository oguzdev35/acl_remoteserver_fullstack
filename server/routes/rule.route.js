import express from 'express';
import ruleCtrl from '../controllers/rule.controller';
import authCtrl from '../controllers/auth.controller';
import userCtrl from '../controllers/user.controller';
import placeCtrl from '../controllers/place.controller';
import doorCtrl from '../controllers/door.controller';
import personCtrl from '../controllers/person.controller';
import departmentCtrl from '../controllers/department.controller';

const router = express.Router();


router.route('/api/rules/person')
    .post(
        userCtrl.bodyID,
        placeCtrl.bodyID,
        personCtrl.bodyID,
        authCtrl.requireSignin, 
        authCtrl.hasAuthorization, 
        placeCtrl.inUser,
        personCtrl.inPlace,
        ruleCtrl.create
    )
    .get(
        userCtrl.bodyID,
        placeCtrl.bodyID,
        personCtrl.bodyID,
        authCtrl.requireSignin, 
        authCtrl.hasAuthorization, 
        placeCtrl.inUser,
        personCtrl.inPlace,
        ruleCtrl.list
    )

router.route('/api/rules/department')
    .post(
        userCtrl.bodyID,
        placeCtrl.bodyID,
        departmentCtrl.bodyID,
        authCtrl.requireSignin, 
        authCtrl.hasAuthorization, 
        placeCtrl.inUser,
        departmentCtrl.inPlace,
        ruleCtrl.create
    )
    .get(
        userCtrl.bodyID,
        placeCtrl.bodyID,
        departmentCtrl.bodyID,
        authCtrl.requireSignin, 
        authCtrl.hasAuthorization, 
        placeCtrl.inUser,
        departmentCtrl.inPlace,
        ruleCtrl.list
    )

export default router;