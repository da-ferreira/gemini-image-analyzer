import OpenAI from 'openai';
import { GeminiRequestTextFromImage, GeminiResponse } from '../@types/gemini';

class OpenAIService {
  async readMeasureFromImage(params: GeminiRequestTextFromImage): Promise<GeminiResponse> {
    const apiKey = String(process.env.OPENAI_API_KEY);
    const client = new OpenAI({ apiKey });

    const waterOrGas = params.measureType === 'GAS' ? 'gás' : 'água';
    const prompt = `A imagem a seguir, que está em base64, é um medidor de ${waterOrGas}, pegue o número do medidor, apenas o número.
                    Me retorne apenas um json com a resposta: { "measureValue": valor_da_medida }, se nao conseguir achar, insira null no valor`;

    const base64Image = params.image.startsWith('data:')
      ? params.image
      : `data:image/jpeg;base64,${params.image}`;

    const response = await client.chat.completions.create({
      model: 'gpt-4o',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            {
              type: 'image_url',
              image_url: { url: base64Image },
            },
          ],
        },
      ],
      max_tokens: 300,
    });

    const content = response.choices[0]?.message?.content;

    if (!content) {
      return { measureValue: null };
    }

    try {
      return JSON.parse(content);
    } catch {
      return { measureValue: null };
    }
  }
}

export default new OpenAIService();
