import { Measure, MeasureCreate, MeasureProperties } from '../@types/measure';
import { db } from '../config/database';
import geminiService from '../services/gemini';

class MeasureModel {
  async checkingReadingInTheMonth(customerCode: string, measureType: 'WATER' | 'GAS'): Promise<{ id: number }> {
    return db('measurements')
      .select('id')
      .where('customer_code', customerCode)
      .where('measure_type', measureType)
      .first();
  }

  async getMeasureByUuid(measureUuid: string): Promise<{ has_confirmed: number }> {
    return db('measurements').select('has_confirmed').where('measure_uuid', measureUuid).first();
  }

  async confirmMeasureValue(newMeasureValue: number, measureUuid: string) {
    return db('measurements')
      .update({ measure_value: newMeasureValue, has_confirmed: 1 })
      .where('measure_uuid', measureUuid);
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

  async listByCustomerCode(customerCode: string, measureType: string | undefined): Promise<Measure[]> {
    return db('measurements')
      .select('measure_uuid', 'measure_datetime', 'measure_type', 'has_confirmed', 'image_url')
      .where('customer_code', customerCode)
      .where(function () {
        if (measureType) {
          this.where('measure_type', measureType);
        }
      });
  }
}

export default new MeasureModel();
