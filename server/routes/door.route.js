import express from 'express';
import doorCtrl from '../controllers/door.controller';

const router = express.Router();

router.route('/api/doors')
    .get(doorCtrl.list)
    .post(doorCtrl.create);

router.route('/api/doors/:doorId')
    .get(doorCtrl.read)
    .put(doorCtrl.update)
    .delete(doorCtrl.remove);

router.param('doorId', doorCtrl.doorByID);

export default router;