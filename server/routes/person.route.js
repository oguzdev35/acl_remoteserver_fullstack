import express from 'express';
import personCtrl from '../controllers/person.controller';
import userCtrl from '../controllers/user.controller';

const router = express.Router();

router.route('/api/persons/list/:userId')
    .get(userCtrl.requireSignin, userCtrl.hasAuthorization, personCtrl.list);

router.route('/api/persons/create/:userId')
    .post(userCtrl.requireSignin, userCtrl.hasAuthorization, personCtrl.create);

router.route('/api/persons/:userId')
    .get(userCtrl.requireSignin, userCtrl.hasAuthorization, personCtrl.personId, personCtrl.read)
    .put(userCtrl.requireSignin, userCtrl.hasAuthorization, personCtrl.personId, personCtrl.update)
    .post(userCtrl.requireSignin, userCtrl.hasAuthorization, personCtrl.personId, personCtrl.assign)
    .delete(userCtrl.requireSignin, userCtrl.hasAuthorization, personCtrl.personId, personCtrl.remove);

router.param('userId', userCtrl.userByID);

export default router;