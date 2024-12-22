declare module 'tesseract.js' {
  export interface Worker {
    loadLanguage(lang: string): Promise<void>;
    initialize(lang: string): Promise<void>;
    recognize(image: File | string): Promise<{
      data: {
        text: string;
      };
    }>;
    terminate(): Promise<void>;
  }

  export function createWorker(): Promise<Worker>;
} 