import { Router } from 'express';
import customerController from '../controllers/customer.controller';

const router = Router();

router.get('/:customerCode/list', customerController.listByCustomerCode);

export default router;
