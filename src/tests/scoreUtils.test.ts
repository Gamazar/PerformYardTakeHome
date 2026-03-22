import { scorePerson } from '../utils/scoreUtils';
import { Person } from '../models/Person';

const eddyVerde = new Person(
  'Eddy Verde',
  ['rock', 'country'],
  ['Avatar', 'The Good, the Bad and the Ugly'],
  'Florida',
);

const bonnieWang = new Person(
  'Bonnie Wang',
  ['classical'],
  ['Lilo & Stitch', 'Die Hard'],
  'Maryland',
);

const greta = new Person(
  'Greta Heissenberger',
  ['jazz', 'rock'],
  ['The Departed', 'M*A*S*H', 'The Godfather'],
  'Massachusetts',
);

describe('scorePerson()', () => {
  test('returns null when no match', () => {
    expect(scorePerson(eddyVerde, 'beethoven')).toBeNull();
  });

  test('name match scores 4 points', () => {
    const result = scorePerson(eddyVerde, 'eddy');
    expect(result).not.toBeNull();
    expect(result?.score).toBe(4);
    expect(result?.matches).toContain('name');
  });

  test('artist match scores 2 points', () => {
    const result = scorePerson(eddyVerde, 'zeppelin');
    expect(result).not.toBeNull();
    expect(result?.score).toBe(2);
    expect(result?.matches).toContain('artists');
  });

  test('genre match scores 1 point', () => {
    const result = scorePerson(eddyVerde, 'country');
    expect(result).not.toBeNull();
    expect(result?.score).toBe(1);
    expect(result?.matches).toContain('genre');
  });

  test('movie match scores 1 point', () => {
    const result = scorePerson(eddyVerde, 'avatar');
    expect(result).not.toBeNull();
    expect(result?.score).toBe(1);
    expect(result?.matches).toContain('movies');
  });

  test('location match scores 1 point', () => {
    const result = scorePerson(eddyVerde, 'florida');
    expect(result).not.toBeNull();
    expect(result?.score).toBe(1);
    expect(result?.matches).toContain('location');
  });

  test('movies counted at most once even with multiple matches', () => {
    const result = scorePerson(greta, 'the');
    expect(result?.score).toBe(1);
    expect(result?.matches).toEqual(['movies']);
  });

  test('name match is case-insensitive', () => {
    expect(scorePerson(eddyVerde, 'EDDY')).not.toBeNull();
    expect(scorePerson(eddyVerde, 'eddy')).not.toBeNull();
  });

  test('"nni" matches Bonnie Wang via name substring', () => {
    const result = scorePerson(bonnieWang, 'nni');
    expect(result).not.toBeNull();
    expect(result?.matches).toContain('name');
  });

  test('multiple properties can match and scores stack', () => {
    const result = scorePerson(eddyVerde, 'ed');
    expect(result?.score).toBe(6);
    expect(result?.matches).toContain('name');
    expect(result?.matches).toContain('artists');
  });
});
