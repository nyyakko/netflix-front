export type MovieResponse = {
    id: number;
    title: string;
    releaseDate: Date;
    synopsis: string;
    rating: number;
    popularity: number;
    genres: string[];
    original: boolean;
    posterPath: string;
    backdropPath: string;
}
