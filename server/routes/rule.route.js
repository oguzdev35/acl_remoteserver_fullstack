import express from 'express';
import ruleCtrl from '../controllers/rule.controller';
import authCtrl from '../controllers/auth.controller';
import userCtrl from '../controllers/user.controller';
import placeCtrl from '../controllers/place.controller';
import doorCtrl from '../controllers/door.controller';
import personCtrl from '../controllers/person.controller';

const router = express.Router();

router.route('/api/rules/:personId/:doorId/:placeId/:userId')
    .post(authCtrl.requireSignin, authCtrl.hasAuthorization, placeCtrl.inUser, personCtrl.inPlace, ruleCtrl.create)
    .get(authCtrl.requireSignin, authCtrl.hasAuthorization, placeCtrl.inUser, personCtrl.inPlace, ruleCtrl.list)


router.param('userId', userCtrl.userByID);
router.param('personId', personCtrl.personByID);
router.param('placeId', placeCtrl.placeByID);
router.param('doorId', doorCtrl.doorByID);

export default router;