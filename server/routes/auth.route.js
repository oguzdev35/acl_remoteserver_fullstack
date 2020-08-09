import express from 'express';
import userCtrl from '../controllers/user.controller';

const router = express.Router();

router.route('/auth/signin')
    .post(userCtrl.signin);

router.route('/auth/signout')
    .get(userCtrl.signout);

export default router;