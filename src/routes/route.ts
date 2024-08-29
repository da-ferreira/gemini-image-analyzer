import { Router } from 'express';
import measureRouter from './measure.route';
import customerRouter from './customer.route';

const router = Router();

router.use('/', measureRouter);
router.use('/', customerRouter);

export default router;
