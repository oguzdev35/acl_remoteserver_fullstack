import express from 'express';
import userCtrl from '../controllers/user.controller';

const router = express.Router();

router.route('/api/master/create')
    .post(userCtrl.create);

router.route('/api/users/list/:userId')
    .get(userCtrl.requireSignin, userCtrl.requiresMaster, userCtrl.list)

router.route('/api/users/create/:userId')  
    .post(userCtrl.requireSignin, userCtrl.requiresMaster, userCtrl.create);

router.route('/api/users/:userId')
    .get(userCtrl.requireSignin, userCtrl.read)
    .put(userCtrl.requireSignin, userCtrl.hasAuthorization, userCtrl.update)
    .delete(userCtrl.requireSignin, userCtrl.requiresMaster, userCtrl.remove);

router.param('userId', userCtrl.userByID);

export default router; 