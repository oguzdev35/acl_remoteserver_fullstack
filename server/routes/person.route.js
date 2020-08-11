import express from 'express';
import personCtrl from '../controllers/person.controller';
import userCtrl from '../controllers/user.controller';
import authCtrl from '../controllers/auth.controller';
import doorCtrl from '../controllers/door.controller';

const router = express.Router();

router.route('/api/persons/:userId')
    .get(authCtrl.requireSignin, authCtrl.hasAuthorization, personCtrl.list)
    .post(authCtrl.requireSignin, authCtrl.hasAuthorization, personCtrl.create);


router.route('/api/persons/:personId/:userId')
    .get(authCtrl.requireSignin, authCtrl.hasAuthorization, personCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, personCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, personCtrl.remove);

router.route('/api/persons/:personId/:doorId/:userId')
    .post(authCtrl.requireSignin, authCtrl.hasAuthorization, personCtrl.assign)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, personCtrl.revoke);

router.param('userId', userCtrl.userByID);
router.param('personId', personCtrl.personByID);
router.param('doorId', doorCtrl.doorByID);

export default router;