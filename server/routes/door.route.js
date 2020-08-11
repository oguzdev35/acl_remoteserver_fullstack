import express from 'express';
import doorCtrl from '../controllers/door.controller';
import userCtrl from '../controllers/user.controller';
import authCtrl from '../controllers/auth.controller';

const router = express.Router();

router.route('/api/doors/:userId')
    .get(authCtrl.requireSignin, authCtrl.hasAuthorization, doorCtrl.list)
    .post(authCtrl.requireSignin, authCtrl.hasAuthorization, doorCtrl.create);


router.route('/api/doors/:doorId/:userId')
    .get(authCtrl.requireSignin, authCtrl.hasAuthorization, doorCtrl.inUser, doorCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, doorCtrl.inUser, doorCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, doorCtrl.inUser, doorCtrl.remove);

router.param('userId', userCtrl.userByID);
router.param('doorId', doorCtrl.doorByID);

export default router;