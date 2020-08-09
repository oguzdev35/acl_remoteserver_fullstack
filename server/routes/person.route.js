import express from 'express';
import personCtrl from '../controllers/person.controller';

const router = express.Router();

router.route('/api/persons')
    .get(personCtrl.list)
    .post(personCtrl.create);

router.route('/api/persons/:personId')
    .get(personCtrl.read)
    .put(personCtrl.update)
    .post(personCtrl.assign)
    .delete(personCtrl.remove);

router.param('personId', personCtrl.personByID);

export default router;