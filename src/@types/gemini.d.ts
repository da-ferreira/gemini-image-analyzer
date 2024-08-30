export interface GeminiResponse {
  measureValue: string | null;
}

export interface GeminiRequestTextFromImage {
  image: string;
  measureType: 'WATER' | 'GAS';
}
