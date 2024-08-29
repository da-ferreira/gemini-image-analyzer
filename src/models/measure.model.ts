import { db } from '../config/database';
import geminiService from '../services/gemini';

class MeasureModel {
  async checkingReadingInTheMonth(customerCode: string, measureType: 'WATER' | 'GAS') {
    return db('measurements')
      .select('id')
      .where('customer_code', customerCode)
      .where('measure_type', measureType)
      .first();
  }

  async insert(imageBase64: string) {
    const measureValue = await geminiService.readMeasureFromImage(imageBase64);

    return measureValue;
  }
}

export default new MeasureModel();
