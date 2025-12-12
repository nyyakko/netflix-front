export type MovieRequest = {
    title: string;
    releaseDate: Date;
    synopsis: string;
    rating: number;
    popularity: number;
    genres: number[];
    original: boolean;
    posterPath: string;
    backdropPath: string;
};
