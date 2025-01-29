export interface Dates {
    maximum: string;
    minimum: string;
}

export interface MovieResponse {
    original_title: string;
    release_date: string;
    title: string;
    video: boolean;
}

export interface SeriesResponse {
    origin_country: string[],
    original_name: string;
    first_air_date: string;
}

export interface SliderApiResponse extends MovieResponse, SeriesResponse, PeopleResult {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;
}

export interface ApiResponseMovie {
    dates: Dates;
}

export interface ApiResponse extends ApiResponseMovie {
    page: number;
    results: SliderApiResponse[];
    total_pages: number;
    total_results: number;
}

export interface SliderResponseBody {
    itemId: number,
    posterUrl: string,
    ranking: number,
    movieLabel: string,
    genre: string,
    releaseYear: string,
    releaseDate: {
        month: string,
        date: string
    }
}

export interface SliderResponse {
    sliderId: number,
    sliderSectionType: string,
    label: string,
    type: string,
    response: SliderResponseBody[]
}

export interface Genre {
    id: number;
    name: string;
}

export interface GenresApiResponse {
    genres: Genre[];
}

export interface KnownFor {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    media_type: string;
    original_language: string;
    overview: string;
    poster_path: string;
    title?: string;
    name?: string;
    original_name?: string;
    original_title?: string;
    popularity: number;
    vote_average: number;
    vote_count: number;
    release_date?: string;
    first_air_date?: string;
    origin_country?: string[];
}

export interface PeopleResult {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    known_for: KnownFor[];
}

export type SliderSection = {
    ref: HTMLDivElement | null,
    isVisible: boolean
    sliderSectionType: string
    id: number
    type: string
    label: string
    apiUrl: string
}