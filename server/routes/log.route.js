import express from 'express';
import logController from '../controllers/log.controller';
import userController from '../controllers/user.controller';
import authController from '../controllers/auth.controller'

const router = express.Router();

router.route('/api/log/:userId')
    .get(authController.requireSignin, logController.list);

router.route('/api/log/:logId/:userId')
    .get(authController.requireSignin, authController.hasAuthorization, logController.inUser, logController.read)
    .delete(authController.requireSignin, authController.hasAuthorization, logController.inUser, logController.remove)

router.param('logId', logController.logByID);
router.param('userId', userController.userByID);


export default router;