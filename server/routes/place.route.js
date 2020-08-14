import express from 'express';
import placeCtrl from '../controllers/place.controller';
import userCtrl from '../controllers/user.controller';
import authCtrl from '../controllers/auth.controller';

const router = express.Router();

router.route('/api/places/:userId')
    .get(authCtrl.requireSignin, authCtrl.requireMaster, authCtrl.hasAuthorization, placeCtrl.list)
    .post(authCtrl.requireSignin, authCtrl.requireMaster, authCtrl.hasAuthorization, placeCtrl.create);


router.route('/api/places/:placeId/:userId')
    .get(authCtrl.requireSignin, authCtrl.hasAuthorization, authCtrl.requireMaster, placeCtrl.inUser, placeCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, authCtrl.requireMaster, placeCtrl.inUser, placeCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, authCtrl.requireMaster, placeCtrl.inUser, placeCtrl.remove);

router.param('userId', userCtrl.userByID);
router.param('placeId', placeCtrl.placeByID);

export default router;