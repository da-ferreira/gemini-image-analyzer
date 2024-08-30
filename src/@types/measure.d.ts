export interface MeasureProperties {
  image_url: string;
  measure_value: number;
  customer_code: string;
  measure_datetime: string;
  measure_type: 'WATER' | 'GAS';
  measure_uuid: string;
}

export interface MeasureCreate {
  image: string;
  customerCode: string;
  measureDatetime: string;
  measureType: 'WATER' | 'GAS';
  imageUrl: string;
  measureUuid: string;
}
