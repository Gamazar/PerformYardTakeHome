//This file is for data objects mimicking database

import { Person } from "./Person";
export const musicArtists: Map<string, string[]> = new Map([
  ['rock',      ['Led Zeppelin', 'AC/DC', 'Rolling Stones']],
  ['country',   ['Alabama', 'Rascal Flatts']],
  ['classical', ['Mozart', 'Bach', 'Chopin']],
  ['jazz',      ['Miles Davis Quintet', 'Duke Ellington', 'Louis Armstrong']],
  ['ska',       ['Sublime', 'Reel Big Fish', 'The Mighty Mighty Bosstones']],
  ['blues',     ['John Mayer Trio', 'B.B. King', 'Eric Clapton']],
]);

export const people: Person[] = [
  new Person(
    'Eddy Verde',
    ['rock', 'country'],
    ['Avatar', 'The Good, the Bad and the Ugly'],
    'Florida',
  ),
  new Person(
    'Bonnie Wang',
    ['classical'],
    ['Lilo & Stitch', 'Die Hard'],
    'Maryland',
  ),
  new Person(
    'Greta Heissenberger',
    ['jazz', 'rock'],
    ['The Departed', 'M*A*S*H', 'The Godfather'],
    'Massachusetts',
  ),
  new Person(
    'Justin Coker',
    ['country'],
    ['Raiders of the Lost Ark', 'Apollo 13'],
    'South Carolina',
  ),
  new Person(
    'Jason Leo',
    ['rock', 'ska'],
    ['The Dark Knight', 'Top Gun'],
    'Maine',
  ),
  new Person(
    'Doug Akridge',
    ['rock', 'blues'],
    ['Jurassic Park', 'Cast Away', 'Romeo + Juliet'],
    'Washington, D.C.',
  ),
];
