import express from 'express';
import accessCtrl from '../controllers/access.controller';
import personCtrl from '../controllers/person.controller';
import doorCtrl from '../controllers/door.controller';

const router = express.Router();

router.route('/api/access/:doorId/:personId')
    .post(accessCtrl.access);


router.param('personId', personCtrl.personByID);
router.param('doorId', doorCtrl.doorByID);

export default router;