export const detectFormat = (input: string): 'json' | 'xml' => {
  const trimmed = input.trim();
  
  // Empty input defaults to JSON
  if (!trimmed) return 'json';
  
  // Check for XML-like structure (starts with < and ends with >)
  if (/^\s*<[\s\S]*>\s*$/.test(trimmed)) {
    return 'xml';
  }
  
  // Default to JSON for everything else
  return 'json';
};