import { containsSubstring, anyContains } from '../utils/stringUtils';

describe('containsSubstring()', () => {
  test('returns true for exact match', () => {
    expect(containsSubstring('Bonnie Wang', 'Bonnie Wang')).toBe(true);
  });

  test('returns true for partial match', () => {
    expect(containsSubstring('Bonnie Wang', 'nni')).toBe(true);
  });

  test('is case-insensitive', () => {
    expect(containsSubstring('Bonnie Wang', 'BONNIE')).toBe(true);
    expect(containsSubstring('BONNIE WANG', 'bonnie')).toBe(true);
  });

  test('returns false when no match', () => {
    expect(containsSubstring('Bonnie Wang', 'xyz')).toBe(false);
  });

  test('returns false for empty query', () => {
    expect(containsSubstring('Bonnie Wang', 'zzz')).toBe(false);
  });
});

describe('anyContains()', () => {
  test('returns true when one item matches', () => {
    expect(anyContains(['Led Zeppelin', 'AC/DC', 'Rolling Stones'], 'zeppelin')).toBe(true);
  });

  test('returns true when multiple items match', () => {
    expect(anyContains(['The Departed', 'The Godfather'], 'the')).toBe(true);
  });

  test('is case-insensitive', () => {
    expect(anyContains(['Led Zeppelin'], 'LED ZEPPELIN')).toBe(true);
  });

  test('returns false when no items match', () => {
    expect(anyContains(['Led Zeppelin', 'AC/DC'], 'beethoven')).toBe(false);
  });

  test('returns false for empty array', () => {
    expect(anyContains([], 'anything')).toBe(false);
  });
});
