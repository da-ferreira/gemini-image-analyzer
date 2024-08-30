import { MeasureCreate, MeasureProperties } from '../@types/measure';
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

  async insert(params: MeasureCreate) {
    const geminiResponse = await geminiService.readMeasureFromImage({
      image: params.image,
      measureType: params.measureType,
    });

    const measureValue = Number(geminiResponse.measureValue);

    const newMeasure: MeasureProperties = {
      customer_code: params.customerCode,
      image_url: params.imageUrl,
      measure_type: params.measureType,
      measure_datetime: params.measureDatetime,
      measure_value: measureValue,
      measure_uuid: params.measureUuid,
    };

    await db('measurements').insert(newMeasure);

    return measureValue;
  }
}

export default new MeasureModel();
