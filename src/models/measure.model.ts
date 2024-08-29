import { db } from '../config/database';

class MeasureModel {
  async checkingReadingInTheMonth(customerCode: string, measureType: 'WATER' | 'GAS') {
    return db('measurements')
      .select('id')
      .where('customer_code', customerCode)
      .where('measure_type', measureType)
      .first();
  }

  // async insert()
}

export default new MeasureModel();
