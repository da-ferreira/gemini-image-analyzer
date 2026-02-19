import { GeminiRequestTextFromImage, GeminiResponse } from '../@types/gemini';
import geminiService from './gemini';
import openaiService from './openai';

export interface AIService {
  readMeasureFromImage(params: GeminiRequestTextFromImage): Promise<GeminiResponse>;
}

export function getAIService(): AIService {
  const provider = (process.env.AI_PROVIDER || 'gemini').toLowerCase();

  if (provider === 'openai') {
    return openaiService;
  }

  return geminiService;
}
