import express from 'express';
import departmentCtrl from '../controllers/department.controller';
import userCtrl from '../controllers/user.controller';
import authCtrl from '../controllers/auth.controller';
import placeCtrl from '../controllers/place.controller';

const router = express.Router();

router.route('/api/departments/:placeId/:userId')
    .get(authCtrl.requireSignin, authCtrl.requireMaster, authCtrl.hasAuthorization, placeCtrl.inUser, departmentCtrl.list)
    .post(authCtrl.requireSignin, authCtrl.requireMaster, authCtrl.hasAuthorization, placeCtrl.inUser, departmentCtrl.create);


router.route('/api/departments/:departmentId/:placeId/:userId')
    .get(authCtrl.requireSignin, authCtrl.requireMaster, authCtrl.hasAuthorization, placeCtrl.inUser, departmentCtrl.inPlace, departmentCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.requireMaster, authCtrl.hasAuthorization, placeCtrl.inUser, departmentCtrl.inPlace, departmentCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.requireMaster, authCtrl.hasAuthorization, placeCtrl.inUser, departmentCtrl.inPlace, departmentCtrl.remove);

router.param('userId', userCtrl.userByID);
router.param('departmentId', departmentCtrl.departmentByID);
router.param('placeId', placeCtrl.placeByID);

export default router;