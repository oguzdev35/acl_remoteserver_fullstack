import express from 'express';
import userCtrl from '../controllers/user.controller';

const router = express.Router();

router.route('/api/users')
    .get(userCtrl.list)
    .post(userCtrl.create);

router.route('/api/users/:userId')
    .get(userCtrl.requireSignin, userCtrl.read)
    .put(userCtrl.requireSignin, userCtrl.hasAuthorization, userCtrl.update)
    .delete(userCtrl.requireSignin, userCtrl.hasAuthorization, userCtrl.remove);

router.param('userId', userCtrl.userByID);

export default router;