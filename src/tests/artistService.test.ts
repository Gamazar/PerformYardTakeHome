let search: (query: string) => { name: string; score: number; matches: string[] }[];
let addArtist: (genre: string, artist: string) => void;

beforeEach(() => {
  jest.resetModules();
  ({ search, addArtist } = require('../service/artistService'));
});

describe('search()', () => {
  test('spec example — search("ed")', () => {
    expect(search('ed')).toEqual([
      { name: 'Eddy Verde',          score: 6, matches: ['name', 'artists'] },
      { name: 'Greta Heissenberger', score: 3, matches: ['artists', 'movies'] },
      { name: 'Doug Akridge',        score: 2, matches: ['artists'] },
      { name: 'Jason Leo',           score: 2, matches: ['artists'] },
    ]);
  });

  test('spec example — search("the")', () => {
    expect(search('the')).toEqual([
      { name: 'Jason Leo',           score: 3, matches: ['artists', 'movies'] },
      { name: 'Eddy Verde',          score: 1, matches: ['movies'] },
      { name: 'Greta Heissenberger', score: 1, matches: ['movies'] },
      { name: 'Justin Coker',        score: 1, matches: ['movies'] },
    ]);
  });

  test('spec example — search("beethoven") returns []', () => {
    expect(search('beethoven')).toEqual([]);
  });

  test('is case-insensitive', () => {
    expect(search('eddy')).toEqual(search('EDDY'));
  });

  test('"nni" matches Bonnie Wang via name substring', () => {
    const results = search('nni');
    expect(results.some((r) => r.name === 'Bonnie Wang')).toBe(true);
  });

  test('movies counted at most once (Greta + "the")', () => {
    const results = search('the');
    const greta = results.find((r) => r.name === 'Greta Heissenberger');
    expect(greta?.score).toBe(1);
    expect(greta?.matches).toEqual(['movies']);
  });

  test('ties sorted alphabetically by name', () => {
    const results = search('ed');
    const tied = results
      .filter((r) => r.score === 2)
      .map((r) => r.name);
    expect(tied).toEqual(['Doug Akridge', 'Jason Leo']);
  });

  test('returns empty array when no matches', () => {
    expect(search('zzzzz')).toEqual([]);
  });
});
describe('addArtist()', () => {
  test('spec example — add Beethoven then search("beethoven")', () => {
    addArtist('Classical', 'Beethoven');
    expect(search('beethoven')).toEqual([
      { name: 'Bonnie Wang', score: 2, matches: ['artists'] },
    ]);
  });

  test('duplicate artists are ignored', () => {
    addArtist('Classical', 'Beethoven');
    addArtist('Classical', 'beethoven');
    addArtist('Classical', 'BEETHOVEN'); 

    expect(search('beethoven').length).toBe(1);
  });

  test('creates new genre if it does not exist', () => {
    expect(() => addArtist('Funk', 'James Brown')).not.toThrow();
  });

  test('addition is immediately reflected in search', () => {
    expect(search('beethoven')).toEqual([]);
    addArtist('Classical', 'Beethoven');
    expect(search('beethoven').length).toBe(1);
  });

  test('existing artists are not duplicated', () => {
    const beforeCount = search('zeppelin').length;
    addArtist('Rock', 'Led Zeppelin');
    const afterCount = search('zeppelin').length;

    expect(afterCount).toBe(beforeCount);
  });
});
