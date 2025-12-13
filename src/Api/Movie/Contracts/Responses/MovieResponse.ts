import type { GenreResponse } from "../../../Genre/Contracts/Response/GenreResponse";

export type MovieResponse = {
    id: number;
    title: string;
    releaseDate: Date;
    synopsis: string;
    rating: number;
    popularity: number;
    genres: GenreResponse[];
    original: boolean;
    posterPath: string;
    backdropPath: string;
}
