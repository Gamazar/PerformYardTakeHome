export class Person {
    name: string;
    genres: string[];
    movies: string[];
    location: string;

    constructor(name: string, genres: string[], movies: string[], location: string) {
        this.name = name;
        this.genres = genres;
        this.movies = movies;
        this.location = location;
    }
}