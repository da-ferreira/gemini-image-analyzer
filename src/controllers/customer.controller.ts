import { Request, Response } from 'express';

class CustomerController {
  async listByCustomerCode(req: Request, res: Response) {
    return res.status(201).json({ message: req.params.customerCode });
  }
}

export default new CustomerController();
