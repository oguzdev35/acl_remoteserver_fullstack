import express from 'express';
import doorCtrl from '../controllers/door.controller';
import userCtrl from '../controllers/user.controller';

const router = express.Router();

router.route('/api/doors/list/:userId')
    .get(userCtrl.requireSignin, userCtrl.hasAuthorization, doorCtrl.list)


router.route('/api/doors/:userId')
    .get(userCtrl.requireSignin, userCtrl.hasAuthorization, doorCtrl.doorId, doorCtrl.read)
    .post(userCtrl.requireSignin, userCtrl.hasAuthorization, doorCtrl.create)
    .put(userCtrl.requireSignin, userCtrl.hasAuthorization, doorCtrl.doorId, doorCtrl.update)
    .delete(userCtrl.requireSignin, userCtrl.hasAuthorization, doorCtrl.doorId, doorCtrl.remove);

router.param('userId', userCtrl.userByID);

export default router;