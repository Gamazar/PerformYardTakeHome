import { musicArtists } from "../models/data";
export const addArtist= (genre: string, artist: string): void => {
    const key = genre.toLowerCase();

    if(!musicArtists.has(key)) {
        musicArtists.set(key, []);
    }

    const artists = musicArtists.get(key);
     const checkArtist = artists?.some((artist) => artist.toLowerCase() === artist.toLowerCase());

    if(!checkArtist) {
        artists?.push(artist);
    }
    console.log("musicArtists: ", musicArtists);
}