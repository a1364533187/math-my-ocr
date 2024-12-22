declare module 'tesseract.js' {
  export interface WorkerOptions {
    logger?: (arg: any) => void;
    errorHandler?: (arg: any) => void;
  }

  export interface WorkerParams {
    user_defined_dpi?: number;
  }

  export interface RecognizeResult {
    data: {
      text: string;
      hocr?: string;
      tsv?: string;
      box?: string;
      unlv?: string;
      osd?: string;
      confidence: number;
      blocks?: any[];
      paragraphs?: any[];
      lines?: any[];
      words?: any[];
      symbols?: any[];
    };
  }

  export interface Worker {
    load(): Promise<Worker>;
    loadLanguage(langs: string | string[]): Promise<Worker>;
    initialize(langs: string | string[]): Promise<Worker>;
    setParameters(params: WorkerParams): Promise<Worker>;
    recognize(
      image: string | Buffer | File,
      options?: { rectangle?: { top: number; left: number; width: number; height: number } }
    ): Promise<RecognizeResult>;
    terminate(): Promise<void>;
  }

  export function createWorker(options?: WorkerOptions): Promise<Worker>;
} 