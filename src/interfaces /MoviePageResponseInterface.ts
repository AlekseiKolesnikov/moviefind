export interface MovieTvPageContent {
    id: number,
    title: string,
    release_date: string,
    release_year: string,
    adult: boolean,
    vote_average: number,
    vote_count: number,
    main_poster_path: string | null,
    backdrop_poster_path: string | null,
    imdb_id: string,
    production_companies: ProductionCompany[],
    production_countries: ProductionCountry[],
    genres: Genre[],
    overview: string,
    runtime: number,
    spoken_language: SpokenLanguage[],
}

interface MovieContentResponse {
    imdb_id: string;
    title: string;
    original_title: string;
    release_date: string;
    revenue: number;
    runtime: number;
}

interface SeriesContentResponse {
    name: string;
    original_name: string;
    episode_run_time: number[];
    first_air_date: string;
    in_production: boolean;
    last_air_date: string;
    number_of_episodes: number;
    number_of_seasons: number;
    seasons: Season[];
    type: string;
}

export interface ApiContentPageResponse extends MovieContentResponse, SeriesContentResponse {
    adult: boolean;
    backdrop_path: string | null;
    genres: Genre[];
    homepage: string | null;
    id: number;
    origin_country: string[];
    original_language: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline?: string;
    video?: boolean;
    vote_average: number;
    vote_count: number;
}

export interface Genre {
    id: number;
    name: string;
}

export interface ProductionCompany {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

export interface Season {
    air_date: string | null;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
    vote_average: number;
}

export interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}