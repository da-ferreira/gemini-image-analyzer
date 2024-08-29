import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
  async readMeasureFromImage(imageBase64: string) {
    const apiKey = String(process.env.GEMINI_API_KEY);
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: 'text/plain',
    };

    const prompt = `A imagem a seguir, que está em base64, é um medidor de água ou de gás, pegue o número do medidor, apenas o número.`;

    const chatSession = model.startChat({
      // generationConfig,
      history: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
    });

    const result = await chatSession.sendMessage([imageBase64]);

    console.log(result.response.text())

    return result.response.text();
  }
}

export default new GeminiService();
