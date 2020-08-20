import express from 'express';
import accessCtrl from '../controllers/access.controller';

const router = express.Router();

router.route('/api/access')
    .post(
        accessCtrl.access
    );

export default router;