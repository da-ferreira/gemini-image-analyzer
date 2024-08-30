import { GoogleGenerativeAI } from '@google/generative-ai';
import { GeminiRequestTextFromImage, GeminiResponse } from '../@types/gemini';

class GeminiService {
  async readMeasureFromImage(params: GeminiRequestTextFromImage): Promise<GeminiResponse> {
    const apiKey = String(process.env.GEMINI_API_KEY);
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: 'application/json',
    };

    const waterOrGas = params.measureType === 'GAS' ? 'gás' : 'água';
    const prompt = `A imagem a seguir, que está em base64, é um medidor de ${waterOrGas}, pegue o número do medidor, apenas o número.
                    Me retorne apenas um json com a resposta: { measureValue: valor_da_medida }, se nao conseguir achar, insira null no valor`;

    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
    });

    const result = await chatSession.sendMessage([params.image]);

    return JSON.parse(result.response.text());
  }
}

export default new GeminiService();
