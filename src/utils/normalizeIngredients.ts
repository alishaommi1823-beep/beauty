/**
 * Normalizes and splits raw cosmetic ingredient text into clean, individual ingredient tokens.
 */
export function normalizeIngredients(rawText: string): string[] {
  if (!rawText || !rawText.trim()) return [];

  // Remove common prefix headings
  let cleaned = rawText
    .replace(/^ingredients\s*[:\-–—]?\s*/i, '')
    .replace(/^active ingredients\s*[:\-–—]?\s*/i, '')
    .replace(/^inactive ingredients\s*[:\-–—]?\s*/i, '')
    .replace(/^other ingredients\s*[:\-–—]?\s*/i, '');

  // Normalize delimiters: replace semicolons, bullet points, and newlines with commas
  cleaned = cleaned.replace(/[;•·\n\r|]/g, ',');

  // Split on commas that are not nested deep inside balanced parentheses
  const tokens: string[] = [];
  let currentToken = '';
  let parenDepth = 0;

  for (let i = 0; i < cleaned.length; i++) {
    const char = cleaned[i];
    if (char === '(' || char === '[' || char === '{') {
      parenDepth++;
      currentToken += char;
    } else if (char === ')' || char === ']' || char === '}') {
      if (parenDepth > 0) parenDepth--;
      currentToken += char;
    } else if (char === ',' && parenDepth === 0) {
      const trimmed = cleanToken(currentToken);
      if (trimmed) tokens.push(trimmed);
      currentToken = '';
    } else {
      currentToken += char;
    }
  }

  // Push final token
  const finalTrimmed = cleanToken(currentToken);
  if (finalTrimmed) tokens.push(finalTrimmed);

  return tokens;
}

/**
 * Strips leading/trailing punctuation, bullet numbers, organic asterisks, and excess spaces.
 */
function cleanToken(token: string): string {
  return token
    .replace(/^[\s\d.\-*#•:]+/, '') // leading numbers/bullets/spaces
    .replace(/[\s.*#]+$/, '')         // trailing asterisks, periods, spaces
    .replace(/\s+/g, ' ')            // normalize whitespace
    .trim();
}

/**
 * Standardizes a string for comparison (lowercase, single spaces, stripped punctuation).
 */
export function standardizeForLookup(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

