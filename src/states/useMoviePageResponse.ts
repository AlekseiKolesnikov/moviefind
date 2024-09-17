import { create } from "zustand";
import { ApiContentPageResponse, MovieTvPageContent } from "../interfaces /MoviePageResponseInterface.ts";
import axios from "axios";

const API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGRlZTQwNjJkZGM1NDI3NzI0ZTdjYmQ2YTg2ZTlhMSIsIm5iZiI6MTcyNTIyNjU4MS4xNTQ3NTUsInN1YiI6IjY0YjE5ZTQ2MGU0ZmM4MDBhZDVkMTA4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.trEXym5ftq5vCjNXU63PAobmGngKZ_xDB1nKyYqs-NE";
const axiosHeader = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_TOKEN}`
    },
}
const BASE_MOVIE_API_URL = "https://api.themoviedb.org/3/"
const BASE_API_IMAGE_URL = 'https://image.tmdb.org/t/p/w500'

interface MoviePageResponseInterface {
    moviePageContent: MovieTvPageContent[],
    setMoviePageContent: (id: number, response: MovieTvPageContent | undefined) => void,
    getMoviePageContent: (
        type: string,
        id: number,
        pageContentResponseCallback: (response: MovieTvPageContent | undefined) => void
    ) => void
}

export const useMoviePageResponse = create<MoviePageResponseInterface>((set, get) => ({
    moviePageContent: [] as MovieTvPageContent[],
    setMoviePageContent: ((id, response) => set((state) => {
        if (get().moviePageContent.length !== 0) {
            state.moviePageContent = []
        }

        const moviePageResponse = response ? state.moviePageContent
            .filter((content) => content.id !== id)
            .concat(response) : state.moviePageContent

        return { moviePageContent: moviePageResponse }
    })),
    getMoviePageContent: async (type, id, pageContentResponseCallback) => {
        const contentType = type === 'movie' ? 'movie/' : 'tv/'

        axios.get<ApiContentPageResponse>(`${BASE_MOVIE_API_URL}${contentType}${id.toString()}?language=en-US`, axiosHeader)
            .then((result) => {
                const movieTvResponse = (): MovieTvPageContent | undefined => {
                    const response = result.data
                    const releaseYear = response.release_date ? response.release_date.substring(0, 4) : response.first_air_date.substring(0, 4)

                    try {
                        return {
                            id: response.id,
                            title: response.title || response.name,
                            release_date: response.release_date || response.first_air_date,
                            release_year: releaseYear,
                            adult: response.adult,
                            vote_average: response.vote_average,
                            vote_count: response.vote_count,
                            main_poster_path: `${BASE_API_IMAGE_URL}${response.poster_path}` || null,
                            backdrop_poster_path: `${BASE_API_IMAGE_URL}${response.backdrop_path}` || null,
                            imdb_id: response.imdb_id || '-',
                            production_companies: response.production_companies,
                            production_countries: response.production_countries,
                            genres: response.genres,
                            overview: response.overview,
                            runtime: response.runtime,
                            spoken_language: response.spoken_languages
                        }
                    } catch (error) {
                        console.log("Data didn't pass through")
                    }
                }

                pageContentResponseCallback(movieTvResponse())
            })
    }
}))