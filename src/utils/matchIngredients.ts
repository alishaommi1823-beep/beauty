import { IngredientRecord, MatchedIngredient } from '../types/ingredient';
import curatedIngredients from '../data/ingredients.json';
import { normalizeIngredients, standardizeForLookup } from './normalizeIngredients';

const ingredientDataset = curatedIngredients as IngredientRecord[];

/**
 * Matches an individual token against the curated ingredient dataset.
 */
export function matchSingleIngredient(rawToken: string, dataset: IngredientRecord[] = ingredientDataset): MatchedIngredient {
  const normalizedInput = standardizeForLookup(rawToken);

  if (!normalizedInput) {
    return {
      inputTerm: rawToken,
      matchType: 'unknown',
      confidence: 0
    };
  }

  // 1. Direct match on canonical name
  for (const record of dataset) {
    if (standardizeForLookup(record.canonicalName) === normalizedInput) {
      return {
        inputTerm: rawToken,
        matchType: 'exact',
        record,
        confidence: 1.0
      };
    }
  }

  // 2. Direct match on aliases
  for (const record of dataset) {
    for (const alias of record.aliases) {
      if (standardizeForLookup(alias) === normalizedInput) {
        return {
          inputTerm: rawToken,
          matchType: 'alias',
          record,
          confidence: 0.95
        };
      }
    }
  }

  // 3. Check within parentheses (e.g., "Tocopherol (Vitamin E)" or "Aqua/Water/Eau")
  const subParts = rawToken
    .split(/[\(\)\/]/)
    .map(s => standardizeForLookup(s))
    .filter(Boolean);

  for (const part of subParts) {
    for (const record of dataset) {
      if (standardizeForLookup(record.canonicalName) === part) {
        return {
          inputTerm: rawToken,
          matchType: 'exact',
          record,
          confidence: 0.9
        };
      }
      for (const alias of record.aliases) {
        if (standardizeForLookup(alias) === part) {
          return {
            inputTerm: rawToken,
            matchType: 'alias',
            record,
            confidence: 0.85
          };
        }
      }
    }
  }

  // 4. No confident match — mark strictly as unknown
  return {
    inputTerm: rawToken,
    matchType: 'unknown',
    confidence: 0
  };
}

/**
 * Processes an entire raw ingredient text string into structured matches.
 */
export function matchIngredientsList(rawText: string, dataset: IngredientRecord[] = ingredientDataset): {
  tokens: string[];
  matched: MatchedIngredient[];
  stats: { total: number; recognized: number; unknown: number };
} {
  const tokens = normalizeIngredients(rawText);
  const matched = tokens.map(token => matchSingleIngredient(token, dataset));

  const recognized = matched.filter(m => m.matchType !== 'unknown').length;
  const unknown = matched.length - recognized;

  return {
    tokens,
    matched,
    stats: {
      total: tokens.length,
      recognized,
      unknown
    }
  };
}

