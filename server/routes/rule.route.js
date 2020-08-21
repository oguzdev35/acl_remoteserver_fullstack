import express from 'express';
import ruleCtrl from '../controllers/rule.controller';
import authCtrl from '../controllers/auth.controller';
import userCtrl from '../controllers/user.controller';
import placeCtrl from '../controllers/place.controller';

const router = express.Router();

router.route('/api/rules/:placeId/:userId')
    .get(authCtrl.requireSignin, authCtrl.requireMaster, authCtrl.hasAuthorization, placeCtrl.inUser, ruleCtrl.list)
    .post(authCtrl.requireSignin, authCtrl.requireMaster, authCtrl.hasAuthorization, placeCtrl.inUser, ruleCtrl.create);


router.route('/api/rules/:ruleId/:placeId/:userId')
    .get(authCtrl.requireSignin, authCtrl.requireMaster, authCtrl.hasAuthorization, placeCtrl.inUser, ruleCtrl.inPlace, ruleCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.requireMaster, authCtrl.hasAuthorization, placeCtrl.inUser, ruleCtrl.inPlace, ruleCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.requireMaster, authCtrl.hasAuthorization, placeCtrl.inUser, ruleCtrl.inPlace, ruleCtrl.remove);

router.param('userId', userCtrl.userByID);
router.param('ruleId', ruleCtrl.ruleByID);
router.param('placeId', placeCtrl.placeByID);

export default router;