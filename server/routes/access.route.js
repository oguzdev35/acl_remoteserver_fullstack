import express from 'express';
import accessCtrl from '../controllers/access.controller';
import userCtrl from '../controllers/user.controller';
import personCtrl from '../controllers/person.controller';
import doorCtrl from '../controllers/door.controller';
import blockCtrl from '../controllers/block.controller';
import placeCtrl from '../controllers/place.controller';

const router = express.Router();

router.route('/api/access/:doorId/:blockId/:personId/:placeId/:userId')
    .post(placeCtrl.inUser, personCtrl.inPlace, blockCtrl.inPlace, doorCtrl.inBlock, accessCtrl.access);


router.param('userId', userCtrl.userByID);
router.param('personId', personCtrl.personByID);
router.param('doorId', doorCtrl.doorByID);
router.param('blockId', blockCtrl.blockByID);
router.param('placeId', placeCtrl.placeByID);

export default router;