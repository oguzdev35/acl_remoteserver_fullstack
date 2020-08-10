import express from 'express';
import userCtrl from '../controllers/user.controller';

const router = express.Router();

router.route('/auth/signin')
    .post(userCtrl.signin);

router.route('/auth/signout/:userId')
    .get(userCtrl.requireSignin, userCtrl.hasAuthorization, userCtrl.signout);

router.param('userId', userCtrl.userByID);

export default router;