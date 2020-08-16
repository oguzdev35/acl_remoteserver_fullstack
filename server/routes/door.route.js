import express from 'express';
import doorCtrl from '../controllers/door.controller';
import userCtrl from '../controllers/user.controller';
import blockCtrl from '../controllers/block.controller';
import placeCtrl from '../controllers/place.controller';
import authCtrl from '../controllers/auth.controller';

const router = express.Router();

router.route('/api/doors/:blockId/:placeId/:userId')
    .get(authCtrl.requireSignin,authCtrl.requireMaster, authCtrl.hasAuthorization, placeCtrl.inUser, blockCtrl.inPlace, doorCtrl.list)
    .post(authCtrl.requireSignin, authCtrl.requireMaster, authCtrl.hasAuthorization, doorCtrl.create);


router.route('/api/doors/:doorId/:blockId/:placeId/:userId')
    .get(authCtrl.requireSignin, authCtrl.requireMaster, authCtrl.hasAuthorization, placeCtrl.inUser, blockCtrl.inPlace, doorCtrl.inBlock, doorCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.requireMaster, authCtrl.hasAuthorization, placeCtrl.inUser, blockCtrl.inPlace, doorCtrl.inBlock, doorCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.requireMaster, authCtrl.hasAuthorization, placeCtrl.inUser, blockCtrl.inPlace, doorCtrl.inBlock, doorCtrl.remove);

router.param('userId', userCtrl.userByID);
router.param('blockId', blockCtrl.blockByID);
router.param('placeId', placeCtrl.placeByID);
router.param('doorId', doorCtrl.doorByID);

export default router;