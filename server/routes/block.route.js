import express from 'express';
import blockCtrl from '../controllers/block.controller';
import userCtrl from '../controllers/user.controller';
import placeCtrl from '../controllers/place.controller';
import authCtrl from '../controllers/auth.controller';

const router = express.Router();

router.route('/api/blocks/:placeId/:userId')
    .get(authCtrl.requireSignin, authCtrl.hasAuthorization, placeCtrl.inUser, blockCtrl.inPlace, blockCtrl.list)
    .post(authCtrl.requireSignin, authCtrl.hasAuthorization, placeCtrl.create);


router.route('/api/blocks/:blockId/:placeId/:userId')
    .get(authCtrl.requireSignin, authCtrl.hasAuthorization, placeCtrl.inUser, blockCtrl.inPlace, blockCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, placeCtrl.inUser, blockCtrl.inPlace, blockCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, placeCtrl.inUser, blockCtrl.inPlace, blockCtrl.remove);

router.param('userId', userCtrl.userByID);
router.param('placeId', placeCtrl.placeByID);
router.param('blockId', blockCtrl.blockByID);

export default router;