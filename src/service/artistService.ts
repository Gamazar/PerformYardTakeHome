import { people, musicArtists } from "../models/data";
import { SearchResult } from "../models/SearchResult";
import { scorePerson } from "../utils/scoreUtils";
export const addArtist= (genre: string, artist: string): void => {
    const key = genre.toLowerCase();
    if(!musicArtists.has(key)) {
        musicArtists.set(key, []);
    }

    const artists = musicArtists.get(key);
    const checkArtist = artists?.some((a) => a.toLowerCase() === artist.toLowerCase());

    if(!checkArtist) {
        artists?.push(artist);
    }
    console.log("musicArtists: ", musicArtists);
}

export const search = (query: string): SearchResult[] => {
    const results = people.map((person) => scorePerson(person, query)).filter((result): result is SearchResult => result !== null);

    results.sort((a,b) => 
        b.score !== a.score ? b.score - a.score : a.name.localeCompare(b.name)
    );

    return results;
}