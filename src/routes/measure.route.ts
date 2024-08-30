import { Router } from 'express';
import measureController from '../controllers/measure.controller';

const router = Router();

router.post('/upload', measureController.upload);
router.patch('/confirm', measureController.confirm);
router.get('/:customerCode/list', measureController.listByCustomerCode);

export default router;
