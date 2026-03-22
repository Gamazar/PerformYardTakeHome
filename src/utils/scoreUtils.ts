import { musicArtists } from "../models/data";
import { Person } from "../models/Person";
import { SearchResult } from "../models/SearchResult";
import { anyContains, containsSubstring } from "./stringUtils";

const artistsForGenres = (genres: string[]): string[] =>
  genres.flatMap((g) => musicArtists.get(g.toLowerCase()) ?? []);
export function scorePerson(person: Person, query: string):SearchResult|null {
let score = 0;
  const matches: string[] = [];
  if (containsSubstring(person.name, query)) {
    score += 4;
    matches.push('name');
  }

  const artists = artistsForGenres(person.genres);
  if (anyContains(artists, query)) {
    score += 2;
    matches.push('artists');
  }

  if (anyContains(person.genres, query)) {
    score += 1;
    matches.push('genre');
  }

  if (anyContains(person.movies, query)) {
    score += 1;
    matches.push('movies');
  }

  if (containsSubstring(person.location, query)) {
    score += 1;
    matches.push('location');
  }

  if (score === 0) return null;

  return { name: person.name, score, matches };
}