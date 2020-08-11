import express from 'express';
import authCtrl from '../controllers/auth.controller';
import userCtrl from '../controllers/user.controller';

const router = express.Router();

router.route('/auth/signin')
    .post(authCtrl.signin);

router.route('/auth/signout/:userId')
    .get(authCtrl.requireSignin, authCtrl.hasAuthorization, authCtrl.signout);

router.param('userId', userCtrl.userByID);

export default router;