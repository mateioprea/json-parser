import { XMLParser } from 'fast-xml-parser';
import type { ParserResult } from '../types/parser';

export const parseXML = (input: string): ParserResult => {
  try {
    if (!input.trim()) {
      return { result: '', error: null };
    }

    const parser = new XMLParser({
      ignoreAttributes: false,
    });

    const parsed = parser.parse(input);
    return {
      result: JSON.stringify(parsed, null, 2),
      error: null
    };
  } catch (err) {
    return {
      result: '',
      error: err instanceof Error ? err.message : 'Invalid XML'
    };
  }
};