import { Router } from 'express';
import measureRouter from './measure.route';

const router = Router();

router.use('/', measureRouter);

export default router;
