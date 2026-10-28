export interface IngredientRecord {
  id: string;
  canonicalName: string;
  aliases: string[];
  commonFunction: string;
  plainLanguageExplanation: string;
  sensitivityNotes: string;
  evidenceOrReference: string;
  reviewStatus: 'reviewed' | 'draft';
  category?: 'hydrator' | 'antioxidant' | 'soothing' | 'exfoliant' | 'preservative' | 'surfactant' | 'emollient' | 'fragrance' | 'other';
}

export interface MatchedIngredient {
  inputTerm: string;
  matchType: 'exact' | 'alias' | 'unknown';
  record?: IngredientRecord;
  confidence: number;
}

export interface ScanResult {
  rawText: string;
  tokens: string[];
  matched: MatchedIngredient[];
  timestamp: string;
  sourceType: 'ocr' | 'manual' | 'sample';
}

