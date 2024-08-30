import { Request, Response } from 'express';
import measureModel from '../models/measure.model';
import fs from 'fs-extra';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

class MeasureController {
  async upload(req: Request, res: Response) {
    const body = req.body;

    const requiredFields = ['image', 'customer_code', 'measure_datetime', 'measure_type'];
    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        error_code: 'INVALID_DATA',
        message: `Campos obrigatórios não informados: ${missingFields.join(', ')}`,
      });
    }

    // 👉 validando campos informados
    if (typeof body.image !== 'string') {
      return res
        .status(400)
        .json({ error_code: 'INVALID_DATA', message: `Tipo inválido para 'image'. Deve ser uma string base64 válida` });
    }

    if (typeof body.customer_code !== 'string') {
      return res
        .status(400)
        .json({ error_code: 'INVALID_DATA', message: `Tipo inválido para 'customer_code'. Deve ser uma string` });
    }

    if (isNaN(Date.parse(body.measure_datetime))) {
      return res.status(400).json({
        error_code: 'INVALID_DATA',
        message: `Tipo inválido para 'measure_datetime'. Deve ser uma data valida em string`,
      });
    }

    const validMeasureTypes = ['WATER', 'GAS'];

    if (!validMeasureTypes.includes(body.measure_type.toUpperCase())) {
      return res.status(400).json({
        error_code: 'INVALID_DATA',
        message: `Tipo inválido para 'measure_type'. Deve ser 'water' ou 'gas'`,
      });
    }

    const isThereReadingInTheMonth = await measureModel.checkingReadingInTheMonth(
      body.customer_code,
      body.measure_type
    );

    if (isThereReadingInTheMonth) {
      return res.status(409).json({ error_code: 'DOUBLE_REPORT', message: `Leitura do mês já realizada` });
    }

    const measureUuid = uuidv4();

    const mimeType = body.image.split(';')[0].split(':')[1];
    const fileExtension = mimeType.split('/')[1];
    const base64Data = body.image.replace(/^data:image\/\w+;base64,/, '');
    const imageName = `${measureUuid}.${fileExtension}`;
    const imagePath = path.join(__dirname, '..', 'uploads', imageName);
    const imageBuffer = Buffer.from(base64Data, 'base64');

    await fs.outputFile(imagePath, imageBuffer);

    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${imageName}`;

    const measureValues = await measureModel.insert({
      image: body.image,
      measureDatetime: body.measure_datetime,
      customerCode: body.customer_code,
      measureType: body.measure_type.toUpperCase(),
      imageUrl,
      measureUuid,
    });

    return res.status(200).json(measureValues);
  }

  async confirm(req: Request, res: Response) {
    //
  }
}

export default new MeasureController();
