import express from 'express';
import doorCtrl from '../controllers/door.controller';
import userCtrl from '../controllers/user.controller';
import blockCtrl from '../controllers/block.controller';
import placeCtrl from '../controllers/place.controller';
import authCtrl from '../controllers/auth.controller';

const router = express.Router();

router.route('/api/doors/:blockId/:placeId/:userId')
    .get(authCtrl.requireSignin, authCtrl.hasAuthorization, placeCtrl.inUser, blockCtrl.inPlace, doorCtrl.inBlock, doorCtrl.list)
    .post(authCtrl.requireSignin, authCtrl.hasAuthorization, doorCtrl.create);


router.route('/api/doors/:doorId/:blockId/:placeId/:userId')
    .get(authCtrl.requireSignin, authCtrl.hasAuthorization, placeCtrl.inUser, blockCtrl.inPlace, doorCtrl.inBlock, doorCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, placeCtrl.inUser, blockCtrl.inPlace, doorCtrl.inBlock, doorCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, placeCtrl.inUser, blockCtrl.inPlace, doorCtrl.inBlock, doorCtrl.remove);

router.param('userId', userCtrl.userByID);
router.param('doorId', blockCtrl.blockByID);
router.param('doorId', placeCtrl.placeByID);
router.param('doorId', doorCtrl.doorByID);

export default router;