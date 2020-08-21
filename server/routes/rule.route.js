import express from 'express';
import ruleCtrl from '../controllers/rule.controller';
import authCtrl from '../controllers/auth.controller';
import userCtrl from '../controllers/user.controller';
import placeCtrl from '../controllers/place.controller';
import departmentCtrl from '../controllers/department.controller';

const router = express.Router();

router.route('/api/rules')
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
        authCtrl.requireSignin, 
        authCtrl.hasAuthorization, 
        placeCtrl.inUser,
        ruleCtrl.list
    )
    .delete(
        userCtrl.bodyID,
        placeCtrl.bodyID,
        ruleCtrl.bodyID,
        authCtrl.requireSignin, 
        authCtrl.hasAuthorization, 
        placeCtrl.inUser,
        ruleCtrl.inPlace,
        ruleCtrl.remove   
    )
    .put(
        userCtrl.bodyID,
        placeCtrl.bodyID,
        ruleCtrl.bodyID,
        authCtrl.requireSignin, 
        authCtrl.hasAuthorization, 
        placeCtrl.inUser,
        ruleCtrl.inPlace,
        ruleCtrl.update      
    )

export default router;