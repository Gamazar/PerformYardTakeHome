export const containsSubstring = (value: string, query: string): boolean =>
  value.toLowerCase().includes(query.toLowerCase());

export const anyContains = (items: string[], query: string): boolean =>
  items.some((item) => containsSubstring(item, query));