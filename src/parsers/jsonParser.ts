import type { ParserResult } from '../types/parser';

export const parseJSON = (input: string): ParserResult => {
  try {
    if (!input.trim()) {
      return { result: '', error: null };
    }
    const parsed = JSON.parse(input);
    return {
      result: JSON.stringify(parsed, null, 2),
      error: null
    };
  } catch (err) {
    return {
      result: '',
      error: err instanceof Error ? err.message : 'Invalid JSON'
    };
  }
};